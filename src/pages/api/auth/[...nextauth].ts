import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "../../../server/services/auth";

const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Sign-in",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if(!credentials?.username) return null;
          if(!credentials?.password) return null;
          
          const data = await authService.login(credentials.username, credentials.password)

          if (!data) return null

          return {
            id: data?.id,
            username: data?.username,
            token: data?.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.token = user.token;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user.username = token.username as string;
      session.user.token = token.token as string;

      return Promise.resolve(session);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;