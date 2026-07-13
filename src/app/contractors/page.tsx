import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Contractors — Vettd",
  description: "Browse verified contractors for your home or commercial projects.",
};

export default async function ContractorsPage() {
  const contractors = await prisma.user.findMany({
    where: { role: "CONTRACTOR", trade: { not: null } },
    orderBy: { rating: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      trade: true,
      serviceRadius: true,
      rating: true,
      isLicensed: true,
      isInsured: true,
      isIdentityVerified: true,
      isWSIBClear: true,
      takesCommercial: true,
      _count: { select: { bids: true, reviewsReceived: true } },
    },
  });

  const trades = [...new Set(contractors.map(c => c.trade).filter(Boolean))].sort();

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Find Contractors</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            {contractors.length} verified pro{contractors.length !== 1 ? "s" : ""} ready to help
          </p>
        </div>
      </div>

      {/* Trade filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/contractors" className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#2852C7] text-white">
          All Trades
        </Link>
        {trades.map(trade => (
          <Link
            key={trade}
            href={`/contractors?trade=${encodeURIComponent(trade!)}`}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#F0EDE8] text-[#6B6358] hover:bg-[#E2DDD6] transition-colors"
          >
            {trade}
          </Link>
        ))}
      </div>

      {contractors.length === 0 ? (
        <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-12 text-center">
          <p className="text-[#9C958A] text-lg mb-2">No contractors listed yet</p>
          <p className="text-[#9C958A] text-sm">Check back soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractors.map(contractor => (
            <Link
              key={contractor.id}
              href={`/contractors/${contractor.id}`}
              className="block bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#2852C7]/10 flex items-center justify-center text-[#2852C7] font-bold text-sm">
                  {contractor.name?.[0] || "P"}
                </div>
                <div>
                  <h3 className="font-semibold text-[#163D75]">{contractor.name || "Professional"}</h3>
                  <p className="text-xs text-[#6B6358]">{contractor.trade}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {contractor.isLicensed && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669]">✓ Licensed</span>}
                {contractor.isInsured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EBF0F8] text-[#2852C7]">✓ Insured</span>}
                {contractor.isIdentityVerified && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F3FF] text-[#7C3AED]">✓ Verified</span>}
                {contractor.takesCommercial && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF0D5] text-[#A5620A]">Commercial-ready</span>}
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6358]">
                <span>⭐ {contractor.rating?.toFixed(1) || "New"}</span>
                <span>{contractor._count.reviewsReceived} review{contractor._count.reviewsReceived !== 1 ? "s" : ""}</span>
                <span>{contractor.serviceRadius || "—"} km radius</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}