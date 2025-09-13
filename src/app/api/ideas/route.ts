import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Slug generator helper
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// GET: fetch all ideas created by the current user (both drafts and published)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ideas = await prisma.idea.findMany({
      where: { createdById: session.user.id },
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

// POST: create a new idea for the current user
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, tags, published } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 },
      );
    }

    // check if user has verified email
    const canPublish = !!session.user.emailVerified;

    // generate unique slug
    let slug = generateSlug(title);
    let exists = await prisma.idea.findUnique({ where: { slug } });
    let counter = 1;
    while (exists) {
      slug = `${generateSlug(title)}-${counter++}`;
      exists = await prisma.idea.findUnique({ where: { slug } });
    }

    const newIdea = await prisma.idea.create({
      data: {
        title,
        slug,
        description,
        category: category || null,
        tags: tags || [],
        published: canPublish ? published : false,
        createdById: session.user.id,
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
