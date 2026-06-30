import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  let jobs;

  if (role === "HOMEOWNER") {
    jobs = await prisma.job.findMany({
      where: { homeownerId: userId },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { sender: { select: { name: true } } }
        },
        bids: {
          select: { id: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });
  } else {
    // Contractor: find jobs they bid on
    jobs = await prisma.job.findMany({
      where: {
        bids: {
          some: { contractorId: userId }
        }
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { sender: { select: { name: true } } }
        },
        homeowner: {
          select: { name: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });
  }

  // Filter only jobs that have messages or are "active" for the user
  const activeConversations = jobs.filter(j => j.messages.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Messages</h1>
      
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        {activeConversations.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {activeConversations.map((job) => {
              const lastMessage = job.messages[0];
              const isMine = (lastMessage as any).senderId === userId;
              
              return (
                <li key={job.id} className="hover:bg-gray-50 transition">
                  <Link 
                    href={role === 'HOMEOWNER' ? `/my-jobs/${job.id}` : `/jobs/${job.id}`}
                    className="block p-6"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(lastMessage.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold mr-3 flex-shrink-0">
                        {lastMessage.sender.name?.[0]}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium truncate">
                          {lastMessage.sender.name}: 
                          <span className="font-normal text-gray-500 ml-1">
                            {lastMessage.content}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-12 text-center">
            <div className="mb-4 text-gray-300">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
            <p className="mt-1 text-gray-500">
              When you start communicating about a job, your messages will appear here.
            </p>
            <div className="mt-6">
              <Link
                href={role === "HOMEOWNER" ? "/my-jobs" : "/dashboard"}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Go to {role === "HOMEOWNER" ? "My Jobs" : "Dashboard"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
