import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../utils/prisma';
import type { NextAuthOptions } from 'next-auth';
import { signIn } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      console.log('session', session);

      session.user = user;

      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Add logic here to allow signing in.
    //   // You can return either `true` or `false` to allow or deny the credentials.
    //   // You can also use `Error` to display a message to the user.
    //   // E.g. you could allow sign in only with verified email addresses.
    //   // if (user.emailVerified) {
    //   //   return true
    //   // } else {
    //   //   return false
    //   // }
    //   // console.log('signIn', user, account, profile, email, credentials);

    //   return true;
    // },
    async redirect({ url, baseUrl }) {
      // return url.startsWith(baseUrl) ? url : baseUrl;
      // console.log('redirect', url, baseUrl);

      // return baseUrl;
      // Allows relative callback URLs
      console.log('---------------------');
      console.log('____called redirect calllback____ ');
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      console.log('---------------------');

      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // if (user) {
      //   token.id = user.id;
      // }
      // console.log('jwt', token, user, account, profile, isNewUser);

      return token;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};
export default NextAuth(authOptions);
