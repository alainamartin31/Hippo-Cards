import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deck = await prisma.deck.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!deck) {
    return NextResponse.json({ error: "Deck not found" }, { status: 404 });
  }

  const cards = await prisma.card.findMany({
    where: { deckId: params.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(cards);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deck = await prisma.deck.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!deck) {
    return NextResponse.json({ error: "Deck not found" }, { status: 404 });
  }

  const { front, back } = await request.json();
  if (!front || !back) {
    return NextResponse.json({ error: "Front and back are required" }, { status: 400 });
  }

  const card = await prisma.card.create({
    data: {
      front,
      back,
      deckId: params.id,
    },
  });

  return NextResponse.json(card, { status: 201 });
}
