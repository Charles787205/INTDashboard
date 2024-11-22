import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(process.env.INT_API_URL + "/login/", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          if (res.ok && user) {
            return {
              id: user.id,
              username: user.user.username,
              email: user.user.email,
              firstName: user.first_name,
              middleName: user.middle_name,
              lastName: user.last_name,
              position: user.position,
              isActive: user.is_active,
              isAdmin: user.is_admin,
              groups: user.groups,
              hub: user.hub,
              accessToken: user.access,
              refreshToken: user.refresh,
              accessTokenExpires: Date.now() + 5 * 60 * 1000, // Set token expiration time, e.g., 5 minutes
            };
          }
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Store sessions in JWT
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      // Initial sign-in: add tokens and expiration time
      if (user) {
        return {
          ...user,
        };
      }

      // Return token if it's still valid

      if (Date.now() < token.accessTokenExpires && token.accessToken) {
        return token;
      } else {
        return refreshAccessToken(token);
      }

      // If access token expired, refresh it
    },
    async session({ session, token }) {
      session.user = token; // Pass token into session

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign_in",
    signOut: "/auth/sign_out",
  },
};

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(process.env.INT_API_URL + "/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token.refreshToken, // Send the refresh token
      }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw Error;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + 5 * 60 * 1000, // Update expiration time
      refreshToken: refreshedTokens.refresh || token.refreshToken, // Fall back to old refresh token if not refreshed
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
