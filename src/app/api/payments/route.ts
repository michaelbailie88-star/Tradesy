import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, calculatePlatformFee } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const body = await req.json();
  const { bidId, action } = body;

  if (action === "create-payment") {
    // Homeowner creates payment when accepting a bid
    const bid = await prisma.bid.findUnique({
      where: { id: bidId },
      include: { job: true, contractor: true },
    });
    if (!bid) return NextResponse.json({ error: "Bid not found" }, { status: 404 });
    if (bid.job.homeownerId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const platformFee = calculatePlatformFee(bid.amount);
    const totalAmount = bid.amount + platformFee;

    try {
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: totalAmount,
        currency: "usd",
        metadata: {
          bidId: bid.id,
          jobId: bid.jobId,
          contractorId: bid.contractorId,
          homeownerId: userId,
          platformFee: String(platformFee),
        },
      });

      // Update job and bid status
      await prisma.$transaction([
        prisma.job.update({ where: { id: bid.jobId }, data: { status: "AWARDED" } }),
        prisma.bid.update({ where: { id: bidId }, data: { status: "ACCEPTED" } }),
        prisma.bid.updateMany({
          where: { jobId: bid.jobId, id: { not: bidId }, status: "PENDING" },
          data: { status: "REJECTED" },
        }),
        prisma.payment.create({
          data: {
            jobId: bid.jobId,
            amount: bid.amount,
            platformFee,
            status: "PENDING",
            stripePaymentIntentId: paymentIntent.id,
          },
        }),
      ]);

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: totalAmount,
      });
    } catch (err: any) {
      console.error("Payment creation error:", err);
      return NextResponse.json({ error: err.message || "Payment failed" }, { status: 500 });
    }
  }

  if (action === "release-payment") {
    // Homeowner marks job complete — release funds to contractor
    const { jobId } = body;
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { payment: true },
    });
    if (!job || job.homeownerId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!job.payment?.stripePaymentIntentId) return NextResponse.json({ error: "No payment found" }, { status: 400 });

    try {
      // Capture the payment intent (release funds)
      await getStripe().paymentIntents.capture(job.payment.stripePaymentIntentId);

      await prisma.$transaction([
        prisma.job.update({ where: { id: jobId }, data: { status: "COMPLETED" } }),
        prisma.payment.update({
          where: { jobId },
          data: { status: "RELEASED" },
        }),
      ]);

      return NextResponse.json({ status: "released" });
    } catch (err: any) {
      console.error("Payment release error:", err);
      return NextResponse.json({ error: err.message || "Release failed" }, { status: 500 });
    }
  }

  if (action === "cancel-payment") {
    const { jobId } = body;
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { payment: true },
    });
    if (!job || (job.homeownerId !== userId && (session.user as any).role !== "ADMIN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      if (job.payment?.stripePaymentIntentId) {
        await getStripe().paymentIntents.cancel(job.payment.stripePaymentIntentId);
      }
      await prisma.$transaction([
        prisma.job.update({ where: { id: jobId }, data: { status: "CANCELLED" } }),
        ...(job.payment ? [prisma.payment.update({ where: { jobId }, data: { status: "REFUNDED" } })] : []),
      ]);

      return NextResponse.json({ status: "cancelled" });
    } catch (err: any) {
      console.error("Payment cancel error:", err);
      return NextResponse.json({ error: err.message || "Cancel failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const role = (session.user as any).role;
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where: any = role === "CONTRACTOR"
    ? { job: { bids: { some: { contractorId: userId } } } }
    : { job: { homeownerId: userId } };
  if (status) where.status = status;

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      job: {
        select: { id: true, title: true, status: true },
      },
    },
  });

  return NextResponse.json(payments);
}