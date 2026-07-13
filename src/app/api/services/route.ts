import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  category: z.string().min(1),
  priceType: z.enum(["fixed", "hourly", "quote"]),
  price: z.coerce.number().optional(),
  duration: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contractorId = searchParams.get("contractorId");
  const category = searchParams.get("category");

  const where: any = { active: true };
  if (contractorId) where.contractorId = contractorId;
  if (category) where.category = category;

  const services = await prisma.service.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      contractor: {
        select: { id: true, name: true, trade: true, rating: true, isLicensed: true, isInsured: true },
      },
    },
  });

  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "CONTRACTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const service = await prisma.service.create({
    data: {
      ...parsed.data,
      price: parsed.data.price || null,
      contractorId: (session.user as any).id,
    },
  });

  return NextResponse.json(service, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "CONTRACTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

  const parsed = serviceSchema.partial().safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const service = await prisma.service.updateMany({
    where: { id, contractorId: (session.user as any).id },
    data: parsed.data,
  });

  if (service.count === 0) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "CONTRACTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

  await prisma.service.deleteMany({
    where: { id, contractorId: (session.user as any).id },
  });

  return NextResponse.json({ status: "deleted" });
}