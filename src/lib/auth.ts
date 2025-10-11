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
      // Authorize user with email and password
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user not found or has no password, return null
        if (!user || !user.hashedPassword) return null;

        // Compare hashed passwords
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  // Use JWT strategy for sessions
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
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id: true, emailVerified: true },
          });

          let userId = existingUser?.id;

          // If user does not exist, create them
          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name ?? "",
                image: user.image ?? null,
                emailVerified: new Date(),
              },
            });
            userId = newUser.id;
          }
          // If user exists but emailVerified is not set, update it
          else if (!existingUser.emailVerified) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { emailVerified: new Date() },
            });
          }

          // Check if account OAuth is already linked
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          // If not, link OAuth account to user
          if (!existingAccount && userId) {
            await prisma.account.create({
              data: {
                userId,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token ?? null,
                refresh_token: account.refresh_token ?? null,
                expires_at: account.expires_at ?? null,
              },
            });
          }
        } catch (err) {
          console.error("Error handling OAuth sign-in:", err);
          return false; // block login if something went wrong
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
    // Include emailVerified in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.emailVerified = (user as User).emailVerified ?? null;
      }
      return token;
    },
  },
};
