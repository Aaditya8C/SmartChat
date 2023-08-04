import GithubProvider from "next-auth/providers/github";
import nextAuth from "next-auth";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default nextAuth(authOptions);
