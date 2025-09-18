import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// GET: fetch single idea by id
export async function GET(req: Request, { params }: any) {
  try {
    const { id } = params;

    const idea = await prisma.idea.findUnique({
      where: { id },
    });

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(idea);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch idea" },
      { status: 500 },
    );
  }
}

// PUT: update idea (only if belongs to current user)
export async function PUT(req: Request, { params }: any) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, tags, published } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    const canPublish = !!currentUser?.emailVerified;

    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea || idea.createdById !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedIdea = await prisma.idea.update({
      where: { id },
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
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update idea" },
      { status: 500 },
    );
  }
}

// DELETE: delete idea (only if belongs to current user)
export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idea = await prisma.idea.findUnique({ where: { id } });
    if (!idea || idea.createdById !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.idea.delete({ where: { id } });
    return NextResponse.json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete idea" },
      { status: 500 },
    );
  }
}
