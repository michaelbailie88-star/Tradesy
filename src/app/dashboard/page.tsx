import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const openJobs = await prisma.job.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { homeowner: { select: { name: true } } },
  });

  return (
    <div className="container-content py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contractor Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="stat-card">
          <p className="stat-label">Available Jobs</p>
          <p className="stat-value">{openJobs.length}</p>
          <p className="text-sm text-gray-500 mt-1">Find new projects to bid on</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">My Bids</p>
          <p className="stat-value">0</p>
          <p className="text-sm text-gray-500 mt-1">Track your active proposals</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Earnings</p>
          <p className="stat-value">$0</p>
          <p className="text-sm text-gray-500 mt-1">Total revenue from completed jobs</p>
        </div>
      </div>

      {/* Recent jobs */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Open Jobs</h2>
        <Link href="/my-bids" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          View all bids →
        </Link>
      </div>

      <div className="space-y-3">
        {openJobs.length > 0 ? (
          openJobs.map((job) => (
            <div key={job.id} className="job-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-primary">{job.category}</span>
                  <span className="status-open">Open</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  📍 {job.location} · Posted by {job.homeowner.name}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{job.description}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                <p className="text-xl font-bold text-gray-900">
                  {job.budget ? `$${job.budget / 100}` : "Flexible"}
                </p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn-primary text-xs px-4 py-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="stat-card text-center py-12">
            <p className="text-gray-400 text-lg mb-2">No open jobs available at the moment</p>
            <p className="text-gray-400 text-sm">Check back soon for new opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
}