import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch open jobs
  const openJobs = await prisma.job.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { homeowner: { select: { name: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contractor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Available Jobs</h2>
          <p className="text-gray-600">Find new projects to bid on.</p>
          <p className="mt-4 text-2xl font-bold">{openJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">My Bids</h2>
          <p className="text-gray-600">Track your active proposals.</p>
          <p className="mt-4 text-2xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Earnings</h2>
          <p className="text-gray-600">Your total revenue.</p>
          <p className="mt-4 text-2xl font-bold">$0.00</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Open Jobs</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {openJobs.length > 0 ? (
            openJobs.map((job) => (
              <li key={job.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-indigo-600 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {job.category} • {job.location} • Posted by {job.homeowner.name}
                    </p>
                    <p className="text-gray-700 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      {job.budget ? `£${job.budget / 100}` : "Flexible"}
                    </p>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-block mt-4 bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-md hover:bg-indigo-200 transition text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-12 text-center text-gray-500">
              No open jobs available at the moment.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
