import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Slug generator
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// GET: all ideas
export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 },
    );
  }
}

// POST: create idea
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, tags, published } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);

    const newIdea = await prisma.idea.create({
      data: {
        title,
        slug,
        description,
        category: category || null,
        tags: tags || [],
        published: published ?? false,
        createdById: "temp-user-id", // TODO: zamienić na ID zalogowanego usera
      },
    });

    return NextResponse.json(newIdea, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create idea" },
      { status: 500 },
    );
  }
}
