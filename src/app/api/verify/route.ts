import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    const dbToken = await prisma.verificationToken.findUnique({ where: { token } });
    if (!dbToken || dbToken.expires < new Date()) {
        return NextResponse.json({ error: "Token expired or invalid" }, { status: 400 });
    }

    await prisma.user.update({
        where: { email: dbToken.identifier },
        data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ success: true });
}
