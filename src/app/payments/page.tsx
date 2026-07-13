import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Payments — Vettd",
  description: "View your payment history, pending payments, and released funds.",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-[#FFF8ED] text-[#A5620A]",
  HELD_IN_ESCROW: "bg-[#EBF0F8] text-[#2852C7]",
  RELEASED: "bg-[#ECFDF5] text-[#059669]",
  REFUNDED: "bg-[#FEE2E2] text-[#DC2626]",
  FAILED: "bg-[#FEE2E2] text-[#DC2626]",
};

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  const payments = await prisma.payment.findMany({
    where: role === "CONTRACTOR"
      ? { job: { bids: { some: { contractorId: userId } } } }
      : { job: { homeownerId: userId } },
    orderBy: { createdAt: "desc" },
    include: { job: { select: { id: true, title: true, status: true } } },
  });

  const pendingPayments = payments.filter(p => p.status === "PENDING" || p.status === "HELD_IN_ESCROW");
  const totalReleased = payments.filter(p => p.status === "RELEASED").reduce((s, p) => s + p.amount, 0);
  const totalPending = pendingPayments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Payments</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            {role === "CONTRACTOR" ? "Your earnings and payment history" : "Your payment history"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#EBF0F8] to-white rounded-xl border border-[#E2DDD6] p-5">
          <p className="text-sm text-[#6B6358]">Total Payments</p>
          <p className="text-2xl font-extrabold text-[#163D75]">{payments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-[#FFF8ED] to-white rounded-xl border border-[#E2DDD6] p-5">
          <p className="text-sm text-[#6B6358]">Pending / In Escrow</p>
          <p className="text-2xl font-extrabold text-[#E8911A]">{pendingPayments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-[#ECFDF5] to-white rounded-xl border border-[#E2DDD6] p-5">
          <p className="text-sm text-[#6B6358]">Total Released</p>
          <p className="text-2xl font-extrabold text-[#059669]">${(totalReleased / 100).toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl border border-[#E2DDD6] p-5">
          <p className="text-sm text-[#6B6358]">Pending Value</p>
          <p className="text-2xl font-extrabold text-[#7C3AED]">${(totalPending / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Payment list */}
      {payments.length === 0 ? (
        <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-12 text-center">
          <p className="text-[#9C958A] text-lg mb-2">No payments yet</p>
          <p className="text-[#9C958A] text-sm">Payments appear here when jobs are awarded</p>
        </div>
      ) : (
        <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F0EDE8] text-[#6B6358]">
                <th className="text-left p-4 font-medium">Job</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Fee</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6]">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-medium text-[#163D75]">{p.job.title}</td>
                  <td className="p-4 text-[#1E4D92] font-bold">${(p.amount / 100).toFixed(2)}</td>
                  <td className="p-4 text-[#6B6358]">${(p.platformFee / 100).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusStyles[p.status] || "bg-gray-100 text-gray-600"}`}>
                      {p.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-[#9C958A] text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}