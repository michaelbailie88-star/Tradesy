import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contractor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Available Jobs</h2>
          <p className="text-gray-600">Find new projects to bid on.</p>
          <button className="mt-4 text-indigo-600 font-medium hover:underline">View All &rarr;</button>
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
    </div>
  );
}
