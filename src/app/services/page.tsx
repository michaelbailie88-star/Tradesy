import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Listings — Vettd",
  description: "Browse fixed-price services from verified contractors. Hire directly for common home projects.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      contractor: {
        select: { id: true, name: true, trade: true, rating: true, isLicensed: true, isInsured: true },
      },
    },
  });

  const categories = [...new Set(services.map(s => s.category))].sort();

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Service Listings</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            {services.length} fixed-price service{services.length !== 1 ? "s" : ""} — hire directly, no bidding needed
          </p>
        </div>
        <Link href="/services/manage" className="btn-primary text-sm px-4 py-2">
          Manage My Services
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-12 text-center">
          <p className="text-[#9C958A] text-lg mb-2">No services listed yet</p>
          <p className="text-[#9C958A] text-sm">Contractors can list their services here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service.id} className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-5 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-primary text-xs px-2 py-0.5 rounded bg-[#EBF0F8] text-[#163D75]">
                  {service.category}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF0D5] text-[#A5620A]">
                  {service.priceType === "fixed" ? "Fixed Price" : service.priceType === "hourly" ? "Per Hour" : "Get Quote"}
                </span>
              </div>
              <h3 className="font-semibold text-[#163D75] mb-1">{service.title}</h3>
              <p className="text-xs text-[#6B6358] mb-3 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#2852C7]/10 flex items-center justify-center text-[10px] text-[#2852C7] font-bold">
                    {service.contractor.name?.[0] || "P"}
                  </div>
                  <span className="text-xs font-medium text-[#163D75]">{service.contractor.name}</span>
                </div>
                <span className="text-lg font-bold text-[#1E4D92]">
                  {service.price ? `$${service.price / 100}` : "—"}
                </span>
              </div>
              {service.duration && (
                <p className="text-[10px] text-[#9C958A]">⏱ {service.duration}</p>
              )}
              <div className="flex items-center gap-1.5 mt-2">
                {service.contractor.isLicensed && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669]">✓ Licensed</span>}
                {service.contractor.isInsured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EBF0F8] text-[#2852C7]">✓ Insured</span>}
                <span className="text-[10px] text-[#9C958A]">⭐ {service.contractor.rating?.toFixed(1) || "New"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}