import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reviews — Vettd",
  description: "Read real reviews from homeowners and contractors on Vettd.",
};

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      author: { select: { name: true, role: true } },
      subject: { select: { name: true, trade: true } },
    },
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Reviews</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} · Average ⭐ {avgRating}
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-12 text-center">
          <p className="text-[#9C958A] text-lg mb-2">No reviews yet</p>
          <p className="text-[#9C958A] text-sm">Reviews appear here once jobs are completed and rated.</p>
          <Link href="/" className="btn-primary inline-flex mt-4">Browse Jobs</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-5">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-[#E8911A]' : 'text-[#E2DDD6]'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#2D2A25] mb-3 leading-relaxed">{review.comment || "No comment provided."}</p>
              <div className="flex items-center justify-between text-xs text-[#9C958A]">
                <span>By {review.author.name || "Anonymous"} ({review.author.role})</span>
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}