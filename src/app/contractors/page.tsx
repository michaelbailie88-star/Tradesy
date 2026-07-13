import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Find Contractors — Vettd",
  description: "Browse verified, licensed, and insured local tradespeople for your home and commercial projects.",
};

import Link from "next/link";
import { prisma } from "@/lib/prisma";

// ──────────────────────────────────────────────
// Inline SVG Icons
// ──────────────────────────────────────────────
const IconSearch = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const IconVerified = () => (
  <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconShield = () => (
  <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const IconLocation = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const TRADES = [
  "All Trades", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "Painting", "HVAC", "Carpentry", "Flooring", "Handyman",
  "Cleaning", "Moving",
];

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type ContractorCardData = {
  id: string;
  name: string | null;
  trade: string | null;
  rating: number | null;
  serviceRadius: number | null;
  isIdentityVerified: boolean;
  isLicensed: boolean;
  isInsured: boolean;
  image: string | null;
  _count: { reviewsReceived: number; bids: number };
};

// ──────────────────────────────────────────────
// Star Rating
// ──────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>
      <span className="text-sm font-semibold text-[#163D75]">{rating.toFixed(1)}</span>
      <span className="text-xs text-[#9C958A]">({count} review{count !== 1 ? "s" : ""})</span>
    </div>
  );
}

// ──────────────────────────────────────────────
// Contractor Card
// ──────────────────────────────────────────────
function ContractorCard({ contractor }: { contractor: ContractorCardData }) {
  const initials = (contractor.name || "TP").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const tradeColors: Record<string, string> = {
    Plumbing: "from-blue-500/20 to-blue-600/10",
    Electrical: "from-amber-500/20 to-amber-600/10",
    Roofing: "from-red-500/20 to-red-600/10",
    Landscaping: "from-green-500/20 to-green-600/10",
    Painting: "from-purple-500/20 to-purple-600/10",
    HVAC: "from-cyan-500/20 to-cyan-600/10",
  };

  return (
    <Link
      href={`/contractors/${contractor.id}`}
      className="block bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#2852C7]/30"
    >
      {/* Avatar + Name Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2852C7] to-[#1E4D92] flex items-center justify-center text-white font-bold text-lg shrink-0">
          {contractor.image ? (
            <img src={contractor.image} alt={contractor.name || ""} className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#163D75] truncate">
            {contractor.name || "Trade Professional"}
          </h3>
          <p className="text-sm text-[#6B6358]">{contractor.trade || "General Trades"}</p>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {contractor.isLicensed && (
          <span className="verified-badge text-[10px]">
            <IconVerified /> Licensed
          </span>
        )}
        {contractor.isInsured && (
          <span className="verified-badge text-[10px]">
            <IconShield /> Insured
          </span>
        )}
        {contractor.isIdentityVerified && (
          <span className="verified-badge text-[10px]">
            <IconVerified /> Verified
          </span>
        )}
        {!contractor.isLicensed && !contractor.isInsured && !contractor.isIdentityVerified && (
          <span className="text-[10px] text-[#9C958A]">Awaiting verification</span>
        )}
      </div>

      {/* Rating */}
      {contractor.rating && contractor.rating > 0 ? (
        <div className="mb-3">
          <StarRating rating={contractor.rating} count={contractor._count.reviewsReceived} />
        </div>
      ) : (
        <p className="text-xs text-[#9C958A] mb-3">No reviews yet</p>
      )}

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E2DDD6]/50">
        <div className="flex items-center gap-1 text-xs text-[#6B6358]">
          <IconLocation />
          <span>{contractor.serviceRadius ? `${contractor.serviceRadius}km radius` : "Local"}</span>
        </div>
        <span className="text-xs text-[#9C958A]">
          {contractor._count.bids} bid{contractor._count.bids !== 1 ? "s" : ""}
        </span>
      </div>
    </Link>
  );
}

// ──────────────────────────────────────────────
// Main Contractors Page
// ──────────────────────────────────────────────
export default async function ContractorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const tradeFilter = typeof params.trade === "string" ? params.trade : null;
  const searchQuery = typeof params.q === "string" ? params.q : null;
  const minRating = typeof params.minRating === "string" ? parseFloat(params.minRating) : null;

  // Build Prisma where clause
  const where: any = { role: "CONTRACTOR" };
  if (tradeFilter && tradeFilter !== "All Trades") {
    where.trade = tradeFilter;
  }
  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { trade: { contains: searchQuery, mode: "insensitive" } },
    ];
  }
  if (minRating) {
    where.rating = { gte: minRating };
  }

  const contractors = await prisma.user.findMany({
    where,
    orderBy: [{ rating: "desc" }, { name: "asc" }],
    take: 20,
    include: {
      _count: { select: { reviewsReceived: true, bids: true } },
    },
  });

  const activeTrade = tradeFilter && TRADES.slice(1).includes(tradeFilter) ? tradeFilter : "All Trades";

  return (
    <div className="bg-[#F7F5F0] min-h-screen">
      {/* ── Hero / Header ── */}
      <div className="bg-gradient-to-b from-white to-[#F7F5F0] border-b border-[#E2DDD6]/50">
        <div className="container-content py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="gradient-text">Find Contractors</span>
              </h1>
              <p className="text-[#6B6358] mt-1">
                Browse verified local tradespeople for your project
              </p>
            </div>
            <Link href="/post-job" className="btn-primary text-sm !py-2.5 !px-5">
              + Post a Job
            </Link>
          </div>

          {/* Search */}
          <div className="search-bar max-w-2xl mb-5">
            <IconSearch />
            <form action="/contractors" method="GET" className="flex-1 flex">
              <input
                type="text"
                name="q"
                defaultValue={searchQuery || ""}
                placeholder="Search by name or trade…"
                className="flex-1 ml-2"
              />
              {tradeFilter && <input type="hidden" name="trade" value={tradeFilter} />}
              <button type="submit" className="btn-primary text-xs !py-1.5 !px-4 ml-2">
                Search
              </button>
            </form>
          </div>

          {/* Trade Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {TRADES.map((trade) => (
              <Link
                key={trade}
                href={trade === "All Trades" ? "/contractors" : `/contractors?trade=${encodeURIComponent(trade)}`}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                  activeTrade === trade
                    ? "bg-[#2852C7] text-white border-[#2852C7]"
                    : "bg-[#FCFBFA] text-[#6B6358] border-[#E2DDD6] hover:border-[#2852C7]/40 hover:text-[#2852C7]"
                }`}
              >
                {trade}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="container-content py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B6358]">
            <span className="font-semibold text-[#163D75]">{contractors.length}</span> contractor{contractors.length !== 1 ? "s" : ""} found
            {activeTrade !== "All Trades" && ` in ${activeTrade}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-[#E2DDD6] rounded-lg px-3 py-1.5 bg-[#FCFBFA] text-[#6B6358]">
              <option>Top Rated</option>
              <option>Most Reviews</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Cards or Empty State */}
        {contractors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contractors.map((c) => (
              <ContractorCard key={c.id} contractor={c as unknown as ContractorCardData} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EBF0F8] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#2852C7]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#163D75] mb-2">No contractors found</h3>
            <p className="text-sm text-[#6B6358] mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search.`
                : activeTrade !== "All Trades"
                  ? `No ${activeTrade} contractors are registered yet. Try browsing all trades.`
                  : "No contractors are currently listed. Check back soon or post a job to receive bids."}
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/contractors" className="btn-secondary text-sm !py-2.5 !px-5">
                Clear Filters
              </Link>
              <Link href="/signup" className="btn-accent text-sm !py-2.5 !px-5">
                Sign Up as a Pro
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      {contractors.length > 0 && (
        <div className="container-content pb-12">
          <div className="bg-gradient-to-r from-[#EBF0F8] via-white to-[#FFF8ED] border border-[#E2DDD6] rounded-xl p-6 text-center section-pattern-top">
            <h3 className="text-lg font-bold text-[#163D75] mb-2">Are you a skilled tradesperson?</h3>
            <p className="text-sm text-[#6B6358] mb-4">Create a profile and start getting hired for local jobs</p>
            <Link href="/signup" className="btn-accent inline-flex">
              Join as a Pro
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
