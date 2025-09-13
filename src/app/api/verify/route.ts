import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/verified?status=error", req.url));
        }

        const dbToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        // token not found or expired -> error (and delete expired token to keep table clean)
        if (!dbToken || dbToken.expires.getTime() < Date.now()) {
            if (dbToken) {
                // clean up expired token
                try {
                    await prisma.verificationToken.delete({ where: { token } });
                } catch (e) {
                    console.error("Failed to delete expired verification token:", e);
                }
            }
            return NextResponse.redirect(new URL("/verified?status=error", req.url));
        }

        // Atomically update user (set emailVerified)
        await prisma.$transaction([
            prisma.user.update({
                where: { email: dbToken.identifier },
                data: { emailVerified: new Date() },
            }),
            prisma.verificationToken.delete({ where: { token } }),
        ]);

        return NextResponse.redirect(new URL("/verified?status=success", req.url));
    } catch (err) {
        console.error("Email verification error:", err);
        return NextResponse.redirect(new URL("/verified?status=error", req.url));
    }
}
