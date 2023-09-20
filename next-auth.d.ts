import mongoose from "mongoose";
import type { DefaultUser } from "next-auth";

interface IUser {
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
  createdAt: string;
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & IUser;
  }
}
