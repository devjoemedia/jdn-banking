import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "../../../models/User";
import connectDB from "../../../lib/connect-db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
  
          await connectDB();
  
          const user = await User.findOne({
            email: credentials.email,
          });
          console.log(user);
          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }
  
          console.log(user);
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
