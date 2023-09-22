import mongoose from "mongoose";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      photo?: string;
      password: number;
      banks: [];
      accountType: string;
      account: {
        demo: {
          balance: number;
        };
        real: {
          balance: number;
        };
      };
      createdAt: number;
    } & DefaultSession["user"];
  }
}
