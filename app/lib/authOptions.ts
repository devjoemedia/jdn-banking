import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "app/models/User";
import connectDB from "app/lib/connect-db";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        ("authorization");
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
