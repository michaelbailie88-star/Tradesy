import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ContractorProfilePage({ params }: { params: { id: string } }) {
  const contractor = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      reviewsReceived: {
        include: {
          author: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      },
      _count: {
        select: { bids: { where: { status: "ACCEPTED" } } }
      }
    }
  });

  if (!contractor || contractor.role !== "CONTRACTOR") {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-primary-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md">
              <div className="h-full w-full rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold border-2 border-white">
                {contractor.name?.[0] || contractor.email[0]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900">{contractor.name}</h1>
              <p className="text-gray-500 flex items-center mt-1 uppercase tracking-wider text-sm font-semibold">
                {contractor.trade || "General Tradesperson"}
              </p>
              
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center text-yellow-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-bold text-gray-900">{contractor.rating?.toFixed(1) || "0.0"}</span>
                  <span className="ml-1 text-gray-500 text-sm">({contractor.reviewsReceived.length} reviews)</span>
                </div>
                <div className="text-gray-300">|</div>
                <div className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">{contractor._count.bids}</span> jobs completed
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  Professional {contractor.trade} serving customers within {contractor.serviceRadius || 20}km of their location. 
                  Committed to high-quality workmanship and transparent pricing.
                </p>
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-bold mb-6">Recent Reviews</h2>
                {contractor.reviewsReceived.length > 0 ? (
                  <div className="space-y-6">
                    {contractor.reviewsReceived.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-bold text-gray-900">{review.author.name}</div>
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 fill-current ${i < review.rating ? '' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{review.comment}"</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No reviews yet.</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Verification</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className={`w-5 h-5 ${contractor.isIdentityVerified ? 'text-green-500' : 'text-gray-300'} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Identity Verified {!contractor.isIdentityVerified && "(Pending)"}
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className={`w-5 h-5 ${contractor.isLicensed ? 'text-green-500' : 'text-gray-300'} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Licensed Professional {!contractor.isLicensed && "(Pending)"}
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className={`w-5 h-5 ${contractor.isInsured ? 'text-green-500' : 'text-gray-300'} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Insurance Verified {!contractor.isInsured && "(Pending)"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
