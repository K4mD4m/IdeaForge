import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  // Register new user
  try {
    const { name, email, password } = await req.json();

    // Validate request body
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Enforce minimum password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Enforce minimum name length
    if (name.length < 4) {
      return NextResponse.json(
        { error: "Name must be at least 4 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Generate verification token
    const token = randomUUID();
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      },
    });

    // Send verification email
    await sendVerificationEmail(user.email, token);

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
