import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Initialize NextAuth with the provided authentication options
const handler = NextAuth(authOptions);

// Export the handler to handle both GET and POST HTTP requests
export { handler as GET, handler as POST };
