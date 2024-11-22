// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Group {
    id: string;
    name: string;
  }
  interface User {
    id: string;
    username: string;
    email: string;
    groups: Group[];
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    isActive: boolean;

    hub: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    groups: Group[];
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    isActive: boolean;
    isAdmin: boolean;
    hub: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
