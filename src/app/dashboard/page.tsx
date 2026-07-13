import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard — Vettd",
  description: "Your personalized marketplace hub. Find work, post jobs, manage bids, and track earnings on Vettd.",
};

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// ──────────────────────────────────────────────
// Icon components (inline SVGs, no dependencies)
// ──────────────────────────────────────────────
const IconEye = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconDollar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconClock = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconChart = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.706c-.979 0-1.908-.121-2.829-.342m-4.89-6.64c-1.473 0-2.945-.092-4.413-.287m-4.89 6.64c-.978 0-1.908-.121-2.829-.342m-3.85-3.5V8.706c0-1.081.768-2.015 1.837-2.175a48.114 48.114 0 013.413-.387m1.371 2.443l4.087 4.087m4.087-4.087L12 11.787l-4.087-4.087" />
  </svg>
);

const IconCheckCircle = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const IconTag = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type DashboardUser = {
  id: string;
  name: string | null;
  role: string;
};

type JobSummary = {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: number | null;
  status: string;
  createdAt: Date;
  homeowner: { name: string | null };
  bids?: { id: string }[];
};

type BidSummary = {
  id: string;
  amount: number;
  status: string;
  createdAt: Date;
  job: { title: string; id: string };
};

// ──────────────────────────────────────────────
// Stat Card Component
// ──────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  subtext,
  bgClass,
  iconColorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  bgClass: string;
  iconColorClass: string;
}) {
  return (
    <div className={`${bgClass} rounded-xl border border-[#E2DDD6] p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`${iconColorClass} w-11 h-11 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium text-[#6B6358] mb-0.5">{label}</p>
      <p className="text-2xl font-extrabold text-[#163D75]">{value}</p>
      <p className="text-xs text-[#9C958A] mt-1">{subtext}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// Quick Action Button
// ──────────────────────────────────────────────
function QuickAction({
  href,
  label,
  icon,
  color,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: "primary" | "accent" | "secondary";
}) {
  const base =
    "flex items-center gap-2.5 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200";
  const styles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#2852C7] to-[#1E4D92] text-white hover:shadow-md hover:shadow-[#2852C7]/25 hover:-translate-y-0.5",
    accent:
      "bg-gradient-to-r from-[#E8911A] to-[#C97A0E] text-white hover:shadow-md hover:shadow-[#E8911A]/25 hover:-translate-y-0.5",
    secondary:
      "bg-[#FAF9F6] border-2 border-[#2852C7] text-[#1E4D92] hover:bg-[#EBF0F8] hover:-translate-y-0.5",
  };

  return (
    <Link href={href} className={`${base} ${styles[color]}`}>
      {icon}
      {label}
    </Link>
  );
}

// ──────────────────────────────────────────────
// Activity Feed Item
// ──────────────────────────────────────────────
function ActivityItem({
  icon,
  text,
  time,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 group">
      <div className={`${color} w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#2D2A25]">{text}</p>
        <p className="text-xs text-[#9C958A] mt-0.5">{time}</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Job Alert Card
// ──────────────────────────────────────────────
function JobAlert({ category, title, location, budget, href }: {
  category: string;
  title: string;
  location: string;
  budget: string;
  href: string;
}) {
  return (
    <Link href={href} className="block bg-[#FFF8ED] border border-[#FEF0D5] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FEF0D5] text-[#A5620A]">{category}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EBF0F8] text-[#163D75]">New!</span>
      </div>
      <p className="text-sm font-semibold text-[#163D75] truncate">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-[#6B6358]">📍 {location}</span>
        <span className="text-sm font-bold text-[#1E4D92]">{budget}</span>
      </div>
    </Link>
  );
}

// ──────────────────────────────────────────────
// Earnings Bar Chart (CSS only)
// ──────────────────────────────────────────────
function EarningsChart({ data }: { data: { label: string; value: number; max: number }[] }) {
  return (
    <div className="flex items-end gap-2 h-28 pt-2">
      {data.map((item, i) => {
        const height = item.max > 0 ? (item.value / item.max) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
              style={{
                height: `${Math.max(height, 4)}%`,
                background: `linear-gradient(180deg, #2852C7 0%, #1E4D92 100%)`,
              }}
            />
            <span className="text-[10px] text-[#6B6358]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────
// Contractor Dashboard
// ──────────────────────────────────────────────
async function ContractorDashboard({ user }: { user: DashboardUser }) {
  const [openJobs, myBids, recentMessages] = await Promise.all([
    prisma.job.findMany({
      where: { status: "OPEN" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { homeowner: { select: { name: true } }, _count: { select: { bids: true } } },
    }),
    prisma.bid.findMany({
      where: { contractorId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { job: { select: { title: true, id: true, location: true } } },
    }),
    prisma.message.findMany({
      where: { job: { bids: { some: { contractorId: user.id } } } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { sender: { select: { name: true } }, job: { select: { title: true } } },
    }),
  ]);

  const activeBids = myBids.filter((b) => b.status === "PENDING");
  const acceptedBids = myBids.filter((b) => b.status === "ACCEPTED");
  const recentJobs = openJobs.slice(0, 3);

  // Mock chart data for earnings illustration
  const chartData = [
    { label: "Mon", value: 0, max: 800 },
    { label: "Tue", value: 0, max: 800 },
    { label: "Wed", value: 0, max: 800 },
    { label: "Thu", value: 0, max: 800 },
    { label: "Fri", value: 0, max: 800 },
    { label: "Sat", value: 0, max: 800 },
    { label: "Sun", value: 0, max: 800 },
  ];

  // Category-based alerts
  const categoryAlerts = openJobs
    .filter((j) => ["Plumbing", "Electrical", "Roofing"].includes(j.category))
    .slice(0, 3);

  return (
    <>
      {/* ── Welcome + Quick Actions ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Contractor Dashboard</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            Welcome back, {user.name || "Pro"}! Here's your marketplace overview.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B6358]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          Marketplace is live
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <QuickAction href="/jobs" label="Find Work" icon={<IconEye />} color="primary" />
        <QuickAction href="/my-bids" label="My Bids" icon={<IconDollar />} color="accent" />
        <QuickAction href="/messages" label="Messages" icon={<IconBell />} color="secondary" />
        <QuickAction href="/profile" label="View Profile" icon={<IconStar />} color="secondary" />
      </div>

      {/* ── Rich Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard
          icon={<IconEye />}
          label="Available Jobs"
          value={String(openJobs.length)}
          subtext="Open for bidding"
          bgClass="bg-gradient-to-br from-[#EBF0F8] to-white"
          iconColorClass="bg-[#2852C7]/10 text-[#2852C7]"
        />
        <StatCard
          icon={<IconDollar />}
          label="Active Bids"
          value={String(activeBids.length)}
          subtext="Pending review"
          bgClass="bg-gradient-to-br from-[#FFF8ED] to-white"
          iconColorClass="bg-[#F59E0B]/10 text-[#E8911A]"
        />
        <StatCard
          icon={<IconCheckCircle />}
          label="Accepted"
          value={String(acceptedBids.length)}
          subtext="Jobs in progress"
          bgClass="bg-gradient-to-br from-[#ECFDF5] to-white"
          iconColorClass="bg-[#059669]/10 text-[#059669]"
        />
        <StatCard
          icon={<IconClock />}
          label="Response Rate"
          value="--"
          subtext="Avg. response time"
          bgClass="bg-gradient-to-br from-[#F5F3FF] to-white"
          iconColorClass="bg-[#7C3AED]/10 text-[#7C3AED]"
        />
      </div>

      {/* ── Section Separator ── */}
      <div className="section-divider mb-12" />

      {/* ── Two-Column: Activity + Trending ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-[#2852C7] to-[#E8911A] rounded-full inline-block" />
              Activity Feed
            </h2>
            <Link href="/my-bids" className="text-sm font-medium text-[#2852C7] hover:text-[#1E4D92] transition-colors">
              View all →
            </Link>
          </div>

          <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-5 divide-y divide-[#E2DDD6]/50">
            {recentMessages.length > 0 ? (
              recentMessages.slice(0, 3).map((msg) => (
                <ActivityItem
                  key={msg.id}
                  icon={<IconBell />}
                  text={`New message from ${msg.sender.name || "a homeowner"} about "${msg.job.title}"`}
                  time={`${Math.max(1, Math.floor((Date.now() - msg.createdAt.getTime()) / 3600000))}h ago`}
                  color="bg-[#EBF0F8] text-[#2852C7]"
                />
              ))
            ) : (
              <ActivityItem
                icon={<IconTag />}
                text="No recent activity — start by bidding on jobs!"
                time="Just now"
                color="bg-[#FFF8ED] text-[#E8911A]"
              />
            )}
            {activeBids.length > 0 && (
              <ActivityItem
                icon={<IconDollar />}
                text={`You have ${activeBids.length} active bid${activeBids.length > 1 ? "s" : ""} waiting for review`}
                time="Active"
                color="bg-[#ECFDF5] text-[#059669]"
              />
            )}
            {openJobs.length > 0 && (
              <ActivityItem
                icon={<IconBriefcase />}
                text={`${openJobs.length} new job${openJobs.length > 1 ? "s" : ""} available in your area`}
                time="Today"
                color="bg-[#F5F3FF] text-[#7C3AED]"
              />
            )}
          </div>
        </div>

        {/* Trending Jobs */}
        <div>
          <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#E8911A] to-[#C97A0E] rounded-full inline-block" />
            Jobs in Your Area
          </h2>

          <div className="space-y-3">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="badge-primary text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#EBF0F8] text-[#163D75]">
                      {job.category}
                    </span>
                    <span className="text-[10px] text-[#9C958A]">
                      {Math.max(1, Math.floor((Date.now() - job.createdAt.getTime()) / 86400000))}d ago
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#163D75] truncate">{job.title}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-[#6B6358]">📍 {job.location}</span>
                    <span className="text-xs font-bold text-[#1E4D92]">
                      {job.budget ? `$${job.budget / 100}` : "Flexible"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] text-[#9C958A]">{job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}</span>
                    <span className="text-[10px] text-[#6B6358]">by {job.homeowner.name || "Homeowner"}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-6 text-center">
                <p className="text-[#9C958A] text-sm">No jobs available yet</p>
                <p className="text-xs text-[#9C958A] mt-1">Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Section Separator ── */}
      <div className="section-divider mb-12" />

      {/* ── Two-Column: Alerts + Earnings ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Job Alerts */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#059669] to-[#10B981] rounded-full inline-block" />
            Job Alerts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categoryAlerts.length > 0 ? (
              categoryAlerts.map((job) => (
                <JobAlert
                  key={job.id}
                  category={job.category}
                  title={job.title}
                  location={job.location}
                  budget={job.budget ? `$${job.budget / 100}` : "Flexible"}
                  href={`/jobs/${job.id}`}
                />
              ))
            ) : (
              <div className="col-span-full bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-6 text-center">
                <IconBell />
                <p className="text-[#9C958A] text-sm mt-2">No new alerts</p>
                <p className="text-xs text-[#9C958A] mt-1">Jobs in your categories will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Earnings Preview */}
        <div>
          <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#2852C7] to-[#1E4D92] rounded-full inline-block" />
            This Week
          </h2>

          <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-5">
            <p className="text-sm text-[#6B6358] mb-1">Estimated Earnings</p>
            <p className="text-3xl font-extrabold text-[#163D75] mb-4">$0</p>
            <EarningsChart data={chartData} />
            <p className="text-xs text-[#9C958A] text-center mt-3">
              Start bidding to see your earnings trend
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-gradient-to-r from-[#EBF0F8] via-white to-[#FFF8ED] border border-[#E2DDD6] rounded-xl p-6 text-center section-pattern-top">
        <h3 className="text-lg font-bold text-[#163D75] mb-2">Ready to find your next job?</h3>
        <p className="text-sm text-[#6B6358] mb-4">Browse open jobs and submit your bid today</p>
        <Link href="/jobs" className="btn-primary inline-flex">
          Browse Jobs
        </Link>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────
// Homeowner Dashboard
// ──────────────────────────────────────────────
async function HomeownerDashboard({ user }: { user: DashboardUser }) {
  const [myJobs, bidsOnMyJobs] = await Promise.all([
    prisma.job.findMany({
      where: { homeownerId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { bids: true } } },
    }),
    prisma.bid.findMany({
      where: { job: { homeownerId: user.id } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        contractor: { select: { name: true } },
        job: { select: { title: true, id: true } },
      },
    }),
  ]);

  const activeJobs = myJobs.filter((j) => j.status === "OPEN" || j.status === "IN_PROGRESS");
  const pendingBids = bidsOnMyJobs.filter((b) => b.status === "PENDING");
  const completedJobs = myJobs.filter((j) => j.status === "COMPLETED");

  const totalSpent = myJobs.reduce((sum, j) => sum + (j.budget || 0), 0);

  return (
    <>
      {/* ── Welcome + Quick Actions ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">My Dashboard</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            Welcome back, {user.name || "Homeowner"}! Manage your home projects here.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B6358]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          {activeJobs.length} active project{activeJobs.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <QuickAction href="/post-job" label="Post a Job" icon={<IconBriefcase />} color="primary" />
        <QuickAction href="/contractors" label="Find Contractors" icon={<IconEye />} color="accent" />
        <QuickAction href="/messages" label="Messages" icon={<IconBell />} color="secondary" />
        <QuickAction href="/my-jobs" label="My Jobs" icon={<IconTag />} color="secondary" />
      </div>

      {/* ── Rich Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard
          icon={<IconBriefcase />}
          label="Active Jobs"
          value={String(activeJobs.length)}
          subtext="In progress or open"
          bgClass="bg-gradient-to-br from-[#EBF0F8] to-white"
          iconColorClass="bg-[#2852C7]/10 text-[#2852C7]"
        />
        <StatCard
          icon={<IconDollar />}
          label="Pending Bids"
          value={String(pendingBids.length)}
          subtext="Awaiting your review"
          bgClass="bg-gradient-to-br from-[#FFF8ED] to-white"
          iconColorClass="bg-[#F59E0B]/10 text-[#E8911A]"
        />
        <StatCard
          icon={<IconCheckCircle />}
          label="Completed"
          value={String(completedJobs.length)}
          subtext="Jobs finished"
          bgClass="bg-gradient-to-br from-[#ECFDF5] to-white"
          iconColorClass="bg-[#059669]/10 text-[#059669]"
        />
        <StatCard
          icon={<IconChart />}
          label="Total Spent"
          value={`$${(totalSpent / 100).toFixed(0)}`}
          subtext="Across all projects"
          bgClass="bg-gradient-to-br from-[#F5F3FF] to-white"
          iconColorClass="bg-[#7C3AED]/10 text-[#7C3AED]"
        />
      </div>

      {/* ── Section Separator ── */}
      <div className="section-divider mb-12" />

      {/* ── Two-Column: My Jobs + Recent Bids ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* My Posted Jobs */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-[#2852C7] to-[#1E4D92] rounded-full inline-block" />
              My Jobs
            </h2>
            <Link href="/post-job" className="text-sm font-medium text-[#2852C7] hover:text-[#1E4D92] transition-colors">
              + New Job
            </Link>
          </div>

          <div className="space-y-3">
            {myJobs.length > 0 ? (
              myJobs.map((job) => {
                const statusStyles: Record<string, string> = {
                  OPEN: "status-open",
                  IN_PROGRESS: "status-in-progress",
                  COMPLETED: "status-completed",
                };
                return (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="block bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={statusStyles[job.status] || "status-open"}>{job.status.replace("_", " ")}</span>
                      <span className="text-xs text-[#9C958A]">
                        {Math.max(1, Math.floor((Date.now() - job.createdAt.getTime()) / 86400000))}d ago
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#163D75] truncate">{job.title}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-[#6B6358]">{job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}</span>
                      <span className="text-xs font-bold text-[#1E4D92]">
                        {job.budget ? `$${job.budget / 100}` : "Flexible"}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-6 text-center">
                <p className="text-[#9C958A] text-sm mb-2">No jobs posted yet</p>
                <Link href="/post-job" className="btn-primary text-xs px-4 py-2">
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bids */}
        <div>
          <h2 className="text-xl font-bold text-[#163D75] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#E8911A] to-[#C97A0E] rounded-full inline-block" />
            Bids on Your Jobs
          </h2>

          <div className="space-y-3">
            {bidsOnMyJobs.length > 0 ? (
              bidsOnMyJobs.map((bid) => (
                <Link
                  key={bid.id}
                  href={`/jobs/${bid.job.id}`}
                  className="block bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#163D75]">{bid.contractor.name || "A Pro"}</span>
                    <span className="text-sm font-bold text-[#1E4D92]">${bid.amount / 100}</span>
                  </div>
                  <p className="text-xs text-[#6B6358]">
                    on &quot;{bid.job.title}&quot; · {bid.status}
                  </p>
                  <p className="text-[10px] text-[#9C958A] mt-1">
                    {Math.max(1, Math.floor((Date.now() - bid.createdAt.getTime()) / 86400000))}d ago
                  </p>
                </Link>
              ))
            ) : (
              <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-6 text-center">
                <p className="text-[#9C958A] text-sm">No bids yet on your jobs</p>
                <p className="text-xs text-[#9C958A] mt-1">Bids appear here once contractors apply</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-gradient-to-r from-[#EBF0F8] via-white to-[#FFF8ED] border border-[#E2DDD6] rounded-xl p-6 text-center section-pattern-top">
        <h3 className="text-lg font-bold text-[#163D75] mb-2">Need a project done?</h3>
        <p className="text-sm text-[#6B6358] mb-4">Post a job and get bids from verified pros in your area</p>
        <Link href="/post-job" className="btn-primary inline-flex">
          Post a Job
        </Link>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────
// Main Dashboard Page
// ──────────────────────────────────────────────
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user: DashboardUser = {
    id: (session.user as any).id,
    name: session.user.name ?? null,
    role: (session.user as any).role || "HOMEOWNER",
  };

  return (
    <div className="container-content py-8 md:py-12">
      {user.role === "CONTRACTOR" ? (
        <ContractorDashboard user={user} />
      ) : (
        <HomeownerDashboard user={user} />
      )}
    </div>
  );
}
