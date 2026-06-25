import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
            {session.user?.name?.[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
            <span className="inline-block mt-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
              {session.user?.role}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">User ID</p>
              <p className="text-gray-900">{session.user?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Joined</p>
              <p className="text-gray-900">New Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
