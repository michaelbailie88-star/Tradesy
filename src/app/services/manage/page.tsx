import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Services — Vettd",
  description: "Create and manage your service offerings that homeowners can hire directly.",
};

export default async function ManageServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "CONTRACTOR") redirect("/login");

  const contractorId = (session.user as any).id;
  const contractor = await prisma.user.findUnique({
    where: { id: contractorId },
    select: { trade: true },
  });

  const services = await prisma.service.findMany({
    where: { contractorId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-content py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="gradient-text">Manage Services</span>
          </h1>
          <p className="text-[#6B6358] mt-1">
            {services.length} service{services.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Link href="/services/manage/new" className="btn-primary text-sm px-4 py-2">
          + New Service
        </Link>
      </div>

      <div className="bg-[#FCFBFA] border border-[#E2DDD6] rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[#163D75] mb-4">List Your Services</h2>
        <p className="text-sm text-[#6B6358] mb-6">
          Create fixed-price service offerings so homeowners and businesses can hire you directly — no bidding required.
          Your trade is currently listed as <strong>{contractor?.trade || "not set"}</strong>.
        </p>

        {services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#9C958A] mb-4">You haven&apos;t created any services yet.</p>
            <Link href="/services/manage/new" className="btn-primary inline-flex">
              Create Your First Service
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map(service => (
              <div key={service.id} className="bg-white border border-[#E2DDD6] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#163D75]">{service.title}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${service.active ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"}`}>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6358]">{service.category} · {service.priceType} · {service.price ? `$${service.price / 100}` : "Quote"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/services/manage/${service.id}`} className="text-xs text-[#2852C7] hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}