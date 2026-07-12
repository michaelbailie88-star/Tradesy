import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import BidForm from "@/components/bids/BidForm";
import MessageThread from "@/components/jobs/MessageThread";
import { getMessages } from "@/services/messages";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      homeowner: {
        select: { name: true },
      },
      bids: {
        where: { contractorId: (session.user as any).id },
      },
    },
  });

  if (!job) {
    notFound();
  }

  // If homeowner, redirect to management page? 
  // For now let's just show details.
  const isOwner = job.homeownerId === (session.user as any).id;
  const isContractor = (session.user as any).role === "CONTRACTOR";
  const alreadyBid = job.bids.length > 0;

  const messages = await getMessages(job.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/dashboard" className="text-primary-600 hover:text-primary-800 flex items-center">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase mb-2 inline-block">
                {job.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-500 mt-1">
                Posted by {job.homeowner.name} • {job.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                {job.budget ? `£${job.budget / 100}` : "Flexible"}
              </p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {job.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">Timeline</h2>
              <p className="text-gray-700">{job.timeline}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              {isContractor && job.status === "OPEN" && !alreadyBid ? (
                <BidForm jobId={job.id} />
              ) : isContractor && alreadyBid ? (
                <div className="text-center py-6">
                  <div className="text-green-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Bid Submitted</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Your quote of £{job.bids[0].amount / 100} is pending.
                  </p>
                </div>
              ) : isOwner ? (
                <div className="text-center py-6">
                  <Link
                    href={`/my-jobs/${job.id}`}
                    className="w-full inline-block bg-primary-600 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-700 transition"
                  >
                    Manage Job & Bids
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 italic">
                  {job.status !== "OPEN" ? "This job is closed." : "You cannot bid on this job."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {alreadyBid && (
        <div className="mt-12">
          <MessageThread jobId={job.id} initialMessages={messages as any} />
        </div>
      )}
    </div>
  );
}
