import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUserAuthentication } from "@/core/user/services/get-user.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          if (!email || !password) return null;
          const user = await verifyUserAuthentication(email as string, password as string);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
});
