import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: verify email using token
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/verified?status=error", req.url));
    }

    // Search for the token in the database
    const dbToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    // If token not found or expired, redirect to error page
    if (!dbToken || dbToken.expires.getTime() < Date.now()) {
      if (dbToken) {
        try {
          await prisma.verificationToken.delete({
            where: {
              identifier_token: {
                identifier: dbToken.identifier,
                token: dbToken.token,
              },
            },
          });
        } catch (e) {
          console.error("Failed to delete expired verification token:", e);
        }
      }
      return NextResponse.redirect(new URL("/verified?status=error", req.url));
    }

    // Update user's emailVerified field and delete the token
    await prisma.$transaction([
      prisma.user.update({
        where: { email: dbToken.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: dbToken.identifier,
            token: dbToken.token,
          },
        },
      }),
    ]);

    return NextResponse.redirect(new URL("/verified?status=success", req.url));
  } catch (err) {
    console.error("Email verification error:", err);
    return NextResponse.redirect(new URL("/verified?status=error", req.url));
  }
}
