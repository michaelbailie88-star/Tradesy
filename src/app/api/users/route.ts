import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(["HOMEOWNER", "CONTRACTOR"]),
  trade: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.create({ data: parsed.data });
  return NextResponse.json(user, { status: 201 });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json(user);
}
