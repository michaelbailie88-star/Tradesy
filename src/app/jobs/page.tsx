import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Browse Jobs — Vettd",
  description: "Browse available home improvement, maintenance, and commercial projects posted by homeowners and businesses near you.",
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

const IconFilter = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

const IconLocation = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CATEGORIES = [
  "All Categories", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "Painting", "HVAC", "Carpentry", "Flooring", "Handyman",
  "Cleaning", "Moving", "Signage & Murals", "Commercial Lighting",
  "Fit-Out/Renovation", "Commercial Cleaning",
];

const JOB_TYPES = ["All Types", "Residential", "Commercial"];

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type JobCardData = {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number | null;
  location: string;
  status: string;
  createdAt: Date;
  customerType?: string;
  homeowner: { name: string | null };
  _count: { bids: number };
};

// ──────────────────────────────────────────────
// Job Card Component
// ──────────────────────────────────────────────
function JobCard({ job }: { job: JobCardData }) {
  const daysAgo = Math.max(0, Math.floor((Date.now() - job.createdAt.getTime()) / 86400000));
  const timeAgo = daysAgo === 0 ? "Today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;

  const categoryColors: Record<string, string> = {
    Plumbing: "bg-blue-50 text-blue-700",
    Electrical: "bg-amber-50 text-amber-700",
    Roofing: "bg-red-50 text-red-700",
    Landscaping: "bg-green-50 text-green-700",
    Painting: "bg-purple-50 text-purple-700",
    HVAC: "bg-cyan-50 text-cyan-700",
    Carpentry: "bg-orange-50 text-orange-700",
    Flooring: "bg-teal-50 text-teal-700",
    Handyman: "bg-pink-50 text-pink-700",
    Cleaning: "bg-indigo-50 text-indigo-700",
    Moving: "bg-yellow-50 text-yellow-700",
  };

  const catColor = categoryColors[job.category] || "bg-[#EBF0F8] text-[#163D75]";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#2852C7]/30"
    >
      {/* Top row: category badge + time */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${catColor}`}>
          {job.category}
        </span>
        <span className="text-[11px] text-[#9C958A]">{timeAgo}</span>
      </div>

      {/* Title + customer type */}
      <h3 className="text-base font-bold text-[#163D75] mb-1 truncate">{job.title}</h3>
      {(job as any).customerType && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6358]">
          {(job as any).customerType === "BUSINESS" ? "🏢 Business" : "🏠 Homeowner"}
        </span>
      )}

      {/* Description */}
      <p className="text-sm text-[#6B6358] mt-1.5 line-clamp-2">{job.description}</p>

      {/* Bottom row: location, budget, bids */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2DDD6]/50">
        <div className="flex items-center gap-1 text-xs text-[#6B6358]">
          <IconLocation />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#9C958A]">
            {job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}
          </span>
          <span className="text-sm font-bold text-[#1E4D92]">
            {job.budget ? `$${(job.budget / 100).toLocaleString()}` : "Flexible"}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ──────────────────────────────────────────────
// Filter Bar
// ──────────────────────────────────────────────
function FilterBar({ categories, selectedCategory }: { categories: string[]; selectedCategory: string }) {
  // In a real app this would be a client component with interactivity
  // For now, render as static HTML that links to filtered URLs
  return (
    <div className="flex flex-wrap gap-2">
      {categories.slice(0, 8).map((cat) => (
        <Link
          key={cat}
          href={cat === "All Categories" ? "/jobs" : `/jobs?category=${encodeURIComponent(cat)}`}
          className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-all ${
            selectedCategory === cat
              ? "bg-[#2852C7] text-white border-[#2852C7]"
              : "bg-[#FCFBFA] text-[#6B6358] border-[#E2DDD6] hover:border-[#2852C7]/40 hover:text-[#2852C7]"
          }`}
        >
          {cat}
        </Link>
      ))}
      {categories.length > 8 && (
        <span className="text-sm text-[#9C958A] self-center">+{categories.length - 8} more</span>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Jobs Page
// ──────────────────────────────────────────────
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoryFilter = typeof params.category === "string" ? params.category : null;
  const typeFilter = typeof params.type === "string" ? params.type : null;
  const searchQuery = typeof params.q === "string" ? params.q : null;

  // Build Prisma where clause
  const where: any = { status: "OPEN" };
  if (categoryFilter && categoryFilter !== "All Categories") {
    where.category = categoryFilter;
  }
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      homeowner: { select: { name: true } },
      _count: { select: { bids: true } },
    },
  });

  const validCategories = CATEGORIES.slice(1); // exclude "All Categories"
  const activeCategory = categoryFilter && validCategories.includes(categoryFilter) ? categoryFilter : "All Categories";

  return (
    <div className="bg-[#F7F5F0] min-h-screen">
      {/* ── Hero / Header Section ── */}
      <div className="bg-gradient-to-b from-white to-[#F7F5F0] border-b border-[#E2DDD6]/50">
        <div className="container-content py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="gradient-text">Browse Jobs</span>
              </h1>
              <p className="text-[#6B6358] mt-1">
                Find home improvement and commercial projects near you
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/post-job" className="btn-primary text-sm !py-2.5 !px-5">
                + Post a Job
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar max-w-2xl mb-5">
            <IconSearch />
            <form action="/jobs" method="GET" className="flex-1 flex">
              <input
                type="text"
                name="q"
                defaultValue={searchQuery || ""}
                placeholder="Search jobs by title or keyword…"
                className="flex-1 ml-2"
              />
              {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
              <button type="submit" className="btn-primary text-xs !py-1.5 !px-4 ml-2">
                Search
              </button>
            </form>
          </div>

          {/* Type filter tabs */}
          <div className="flex gap-1.5 mb-4">
            {JOB_TYPES.map((t) => (
              <Link
                key={t}
                href={t === "All Types" ? `/jobs${categoryFilter ? `?category=${categoryFilter}` : ""}` : `/jobs?type=${t}${categoryFilter ? `&category=${categoryFilter}` : ""}`}
                className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-all ${
                  (typeFilter === null && t === "All Types") || typeFilter === t
                    ? "bg-[#2852C7] text-white"
                    : "bg-[#FCFBFA] text-[#6B6358] border border-[#E2DDD6] hover:border-[#2852C7]/30"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>

          {/* Category Filter Tabs */}
          <FilterBar categories={CATEGORIES} selectedCategory={activeCategory} />
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="container-content py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B6358]">
            <span className="font-semibold text-[#163D75]">{jobs.length}</span> job{jobs.length !== 1 ? "s" : ""} found
            {activeCategory !== "All Categories" && ` in ${activeCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <div className="flex items-center gap-2">
            <IconFilter />
            <select className="text-sm border border-[#E2DDD6] rounded-lg px-3 py-1.5 bg-[#FCFBFA] text-[#6B6358]">
              <option>Newest First</option>
              <option>Budget: High to Low</option>
              <option>Budget: Low to High</option>
              <option>Most Bids</option>
            </select>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job as JobCardData} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EBF0F8] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#2852C7]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#163D75] mb-2">No jobs found</h3>
            <p className="text-sm text-[#6B6358] mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term or browse all categories.`
                : activeCategory !== "All Categories"
                  ? `No open jobs in ${activeCategory} right now. Try browsing all categories.`
                  : "No open jobs available at the moment. Check back soon or post a job!"}
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/jobs" className="btn-secondary text-sm !py-2.5 !px-5">
                Clear Filters
              </Link>
              <Link href="/post-job" className="btn-primary text-sm !py-2.5 !px-5">
                Post a Job
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      {jobs.length > 0 && (
        <div className="container-content pb-12">
          <div className="bg-gradient-to-r from-[#EBF0F8] via-white to-[#FFF8ED] border border-[#E2DDD6] rounded-xl p-6 text-center section-pattern-top">
            <h3 className="text-lg font-bold text-[#163D75] mb-2">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="text-sm text-[#6B6358] mb-4">Post a job and let the right pro come to you</p>
            <Link href="/post-job" className="btn-primary inline-flex">
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
