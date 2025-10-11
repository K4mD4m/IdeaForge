import { DefaultSession, DefaultUser } from "next-auth";

// Extend next-auth types to include emailVerified and id in session and user objects
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    emailVerified?: Date | null;
  }
}
