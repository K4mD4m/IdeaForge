import NextAuth from "next-auth";

// Extend NextAuth's Session interface with a custom user object that includes id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
    };
  }
}
