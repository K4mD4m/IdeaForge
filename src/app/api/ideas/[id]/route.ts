import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: single idea
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    });

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(idea);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch idea" },
      { status: 500 },
    );
  }
}

// PUT: edit idea
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { title, description, category, tags, published } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: "temp-user-id" },
    });
    const canPublish = !!currentUser?.emailVerified;

    const updatedIdea = await prisma.idea.update({
      where: { id: params.id },
      data: {
        title,
        description,
        category: category || null,
        tags: tags || [],
        published: canPublish ? published : false,
      },
    });

    return NextResponse.json(updatedIdea);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update idea" },
      { status: 500 },
    );
  }
}

// DELETE: delete idea
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.idea.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Idea deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete idea" },
      { status: 500 },
    );
  }
}
