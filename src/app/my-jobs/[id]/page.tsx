import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AcceptBidButton from "@/components/bids/AcceptBidButton";
import CompleteJobButton from "@/components/jobs/CompleteJobButton";
import ReviewForm from "@/components/jobs/ReviewForm";
import MessageThread from "@/components/jobs/MessageThread";
import { getMessages } from "@/services/messages";

export default async function HomeownerJobDetailsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      bids: {
        include: {
          contractor: {
            select: { name: true, trade: true, rating: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!job) {
    notFound();
  }

  if (job.homeownerId !== (session.user as any).id) {
    redirect("/");
  }

  const messages = await getMessages(job.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/my-jobs" className="text-primary-600 hover:text-primary-800 flex items-center">
          ← Back to My Jobs
        </Link>
        <div className="flex space-x-2">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 
            job.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
            'bg-primary-100 text-primary-800'
          }`}>
            {job.status}
          </span>
          {job.status === 'AWARDED' && (
            <CompleteJobButton jobId={job.id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-8 mb-8 border border-gray-200">
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div className="flex space-x-4 mb-6 text-sm text-gray-500">
              <span>{job.category}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>Budget: {job.budget ? `£${job.budget / 100}` : "Flexible"}</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.status === "COMPLETED" && job.bids.some(b => b.status === "ACCEPTED") && (
            <div className="mb-8">
              <ReviewForm 
                jobId={job.id} 
                subjectId={job.bids.find(b => b.status === "ACCEPTED")!.contractorId}
                subjectName={job.bids.find(b => b.status === "ACCEPTED")!.contractor.name!}
              />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6">Bids Received ({job.bids.length})</h2>
          <div className="space-y-4">
            {job.bids.length > 0 ? (
              job.bids.map((bid) => (
                <div key={bid.id} className={`bg-white shadow-md rounded-lg p-6 border ${
                  bid.status === 'ACCEPTED' ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                        {bid.contractor.name?.[0]}
                      </div>
                      <div>
                        <Link href={`/contractors/${bid.contractorId}`} className="font-bold text-lg hover:text-primary-600 transition">
                          {bid.contractor.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {bid.contractor.trade || "Tradesperson"} • ⭐ {bid.contractor.rating || 0}
                        </p>
                        <p className="mt-3 text-gray-700">{bid.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">£{bid.amount / 100}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </p>
                      
                      {job.status === "OPEN" ? (
                        <AcceptBidButton bidId={bid.id} />
                      ) : bid.status === "ACCEPTED" ? (
                        <div className="mt-4 text-green-600 font-bold text-sm uppercase">
                          Accepted
                        </div>
                      ) : (
                        <div className="mt-4 text-gray-400 font-bold text-sm uppercase">
                          {bid.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 text-center text-gray-500 rounded-lg border border-dashed border-gray-300">
                No bids received yet.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-900 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Job Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-300">Timeline</span>
                <span className="font-medium">{job.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-300">Posted</span>
                <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <MessageThread jobId={job.id} initialMessages={messages as any} />
      </div>
    </div>
  );
}
