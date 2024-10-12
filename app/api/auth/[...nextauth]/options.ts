import type { Account, NextAuthOptions, User } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/sign_in",
    signOut: "/auth/sign_in",
  },

  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      session.user = token;
      return session;
    },
    async signIn({ account, profile }) {
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
};
