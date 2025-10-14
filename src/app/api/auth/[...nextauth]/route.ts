import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis
const redis = Redis.fromEnv();

// Create a rate limiter allowing 10 requests per minute per IP
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(10, "1 m"),
    analytics: true,
});

const handler = async (req: Request, ...args: any[]) => {
    // Get IP address
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "127.0.0.1";

    // Apply rate limiting
    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // @ts-ignore
    return NextAuth(authOptions)(req, ...args);
};

export { handler as GET, handler as POST };