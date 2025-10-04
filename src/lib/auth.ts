import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // Prisma adapter
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  // Authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login", // in case of error NextAuth will go to login
  },

  callbacks: {
    async signIn({ user, account }) {
      // When signing in with Google or GitHub, set emailVerified if not set
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { emailVerified: true },
        });

        // If not exists or emailVerified is not set → set it
        if (!existingUser?.emailVerified) {
          await prisma.user.update({
            where: { email: user.email! },
            data: { emailVerified: new Date() },
          });
        }
      }
      return true;
    },

    async redirect({ baseUrl }) {
      // after login redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.emailVerified = (user as User).emailVerified ?? null;
      }
      return token;
    },
  },
};
