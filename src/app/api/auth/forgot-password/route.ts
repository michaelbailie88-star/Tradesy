import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Don't reveal whether user exists — return same message
    return NextResponse.json({ message: "If that email is registered, you'll receive a reset link shortly." });
  }

  // Generate reset token (32 bytes hex)
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken, resetTokenExpiry },
  });

  // In production, send email here. For now, log the token.
  console.log(`Password reset URL: /reset-password/${resetToken}`);

  return NextResponse.json({ message: "If that email is registered, you'll receive a reset link shortly." });
}