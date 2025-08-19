import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: fetch single idea by id
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

// PUT: update idea (only if belongs to current user)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { title, description, category, tags, published } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: "temp-user-id" }, // TODO: replace with session user
    });
    const canPublish = !!currentUser?.emailVerified;

    // Ensure idea belongs to the user
    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    });
    if (!idea || idea.createdById !== currentUser?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

// DELETE: delete idea (only if belongs to current user)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: "temp-user-id" }, // TODO: replace with session user
    });

    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    });
    if (!idea || idea.createdById !== currentUser?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
