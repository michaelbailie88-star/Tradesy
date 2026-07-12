import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(["HOMEOWNER", "CONTRACTOR"]),
  trade: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Require authentication + admin role
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.create({ data: parsed.data });
  // Return limited data, not full user record
  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }, { status: 201 });
}

export async function GET(req: NextRequest) {
  // Require authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  // Only return the requesting user's own data
  const requestingUserId = (session.user as any).id;
  if (id !== requestingUserId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      trade: true,
      rating: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json(user);
}
