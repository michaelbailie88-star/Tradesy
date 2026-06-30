import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ContractorProfileForm from "@/components/seller/ContractorProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
            <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold mx-auto mb-4">
              {user.name?.[0] || user.email[0]}
            </div>
            <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
            <p className="text-gray-600 text-sm mb-4">{user.email}</p>
            <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
              {user.role}
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-medium mb-6">Profile Settings</h3>
            
            {user.role === "CONTRACTOR" ? (
              <ContractorProfileForm user={user} />
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">User ID</p>
                  <p className="text-gray-900">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Joined</p>
                  <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-500 italic mt-8">
                  Homeowner profile editing coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
