import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider  from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("profile github", profile);

        let role = "user";
        if (profile.email == "zyzoznr@gmail.com") {
          role = "admin";
        }
        return {
          ...profile,
          role: role,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("profile google", profile);

        let role = "user";
        if (profile.email == "zyzoznr@gmail.com") {
          role = "admin";
        }
        return {
          ...profile,
          id: profile.sub,
          role: role,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
