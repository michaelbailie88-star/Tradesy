import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const body = await req.json();
  const step = body.step;

  if (step === "role") {
    await prisma.user.update({
      where: { id: userId },
      data: { customerType: body.customerType, role: body.role },
    });
    return NextResponse.json({ step: "role", status: "done" });
  }

  if (step === "business") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        businessName: body.businessName,
        businessType: body.businessType,
        businessAddress: body.businessAddress,
        hstNumber: body.hstNumber,
        siteContactName: body.siteContactName,
        siteContactPhone: body.siteContactPhone,
      },
    });
    return NextResponse.json({ step: "business", status: "done" });
  }

  if (step === "contractor") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        trade: body.trade,
        serviceRadius: body.serviceRadius ? parseInt(body.serviceRadius) : null,
        isLicensed: body.isLicensed === "true",
        isInsured: body.isInsured === "true",
      },
    });
    return NextResponse.json({ step: "contractor", status: "done" });
  }

  if (step === "profile") {
    await prisma.user.update({
      where: { id: userId },
      data: { name: body.name, image: body.image || undefined },
    });
    return NextResponse.json({ step: "profile", status: "done" });
  }

  return NextResponse.json({ error: "Invalid step" }, { status: 400 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      customerType: true,
      role: true,
      name: true,
      businessName: true,
      businessType: true,
      trade: true,
      serviceRadius: true,
      isLicensed: true,
      isInsured: true,
    },
  });

  const steps = [];
  if (!user?.name) steps.push("profile");
  if (!user?.customerType || user.customerType === "homeowner") {
    if (user?.customerType === "homeowner") {}
    else steps.push("role");
  }
  if (user?.customerType === "business" && !user?.businessName) steps.push("business");
  if (user?.customerType === "contractor" && !user?.trade) steps.push("contractor");

  return NextResponse.json({ completed: steps.length === 0, remainingSteps: steps });
}