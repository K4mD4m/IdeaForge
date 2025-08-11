import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";

// Configuration object for NextAuth authentication
export const authOptions: NextAuthOptions = {
  // Use Prisma adapter to connect NextAuth to your Prisma database client
  adapter: PrismaAdapter(db),

  // List of authentication providers
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

        // Explicitly select hashedPassword in the query
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            hashedPassword: true,
          },
        });

        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],

  // Session strategy - use JSON Web Tokens (JWT)
  session: {
    strategy: "jwt",
  },

  // Callbacks to extend or customize NextAuth behavior
  callbacks: {
    session: async ({ session, token }) => {
      try {
        if (!session.user) {
          throw new Error("No user object found in session");
        }

        // Attach the user ID from JWT token to the session user object
        session.user.id = token.sub ?? "";

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);

        return session;
      }
    },
  },
};
