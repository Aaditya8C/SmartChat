import GithubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthOptions } from "next-auth";

import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
    jsonwebtoken.sign(
        {
          ...token,
          iss: "nextauth",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode: async ({ secret, token }) => jsonwebtoken.verify(token, secret),
  },
  callbacks: {
    async jwt({token, profile}) {
      if (profile) {
        token.username = profile?.login;
      }
      return token;
    },
    session({session, token}) {
      if (token?.username) {
        session.username = token.username;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
