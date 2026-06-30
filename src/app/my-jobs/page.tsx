import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

function statusClass(status: string) {
  switch (status) {
    case "OPEN": return "status-open";
    case "IN_PROGRESS": return "status-in-progress";
    case "COMPLETED": return "status-completed";
    default: return "badge-primary";
  }
}

export default async function MyJobsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const myJobs = await prisma.job.findMany({
    where: { homeownerId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bids: true } } },
  });

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Posted Jobs</h1>
        <Link href="/post-job" className="btn-primary text-sm">
          + Post New Job
        </Link>
      </div>

      {myJobs.length > 0 ? (
        <div className="space-y-3">
          {myJobs.map((job) => (
            <div key={job.id} className="job-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-primary">{job.category}</span>
                  <span className={statusClass(job.status)}>{job.status}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                <p className="text-sm text-gray-500">{job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}</p>
                <p className="text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</p>
                <Link href={`/my-jobs/${job.id}`} className="btn-primary text-xs px-4 py-2">
                  View Bids
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="stat-card text-center py-16">
          <p className="text-gray-400 text-lg mb-2">You haven&apos;t posted any jobs yet</p>
          <Link href="/post-job" className="btn-accent text-sm mt-4 inline-flex">
            Post Your First Job
          </Link>
        </div>
      )}
    </div>
  );
}