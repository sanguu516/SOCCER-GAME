import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from '../../../lib/auth'
import GoogleProvider from 'next-auth/providers/google'


let prisma = new PrismaClient();
export default NextAuth({
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
  ,
  providers: [
    GoogleProvider({
      client_id: "45421416122-d8smgucoipne586ntdumm7obb5f25sd5.apps.googleusercontent.com",
      client_secret: "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"
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
          select: {
            name: true, email: true, password: true
          },
        });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        return { name: user.name, email: user.email };
      }
    })
  ],

})