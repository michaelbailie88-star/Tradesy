import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PostJobPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-600 mb-6">
          This is where homeowners will describe their project and request bids.
        </p>
        {/* Placeholder form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g. Fix leaking pipe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={4} placeholder="Describe the job in detail..."></textarea>
          </div>
          <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700">
            Post Job (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
