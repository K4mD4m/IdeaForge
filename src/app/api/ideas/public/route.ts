import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: fetch all published ideas for the wall
export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: { select: { id: true, name: true, image: true } }, // show author info
      },
    });
    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch public ideas" },
      { status: 500 },
    );
  }
}
