"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Tradesy
            </Link>
            <nav className="ml-10 flex space-x-4">
              {session?.user?.role === "HOMEOWNER" && (
                <>
                  <Link href="/post-job" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Post a Job
                  </Link>
                  <Link href="/my-jobs" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    My Jobs
                  </Link>
                  <Link href="/messages" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Messages
                  </Link>
                </>
              )}
              {session?.user?.role === "CONTRACTOR" && (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Find Jobs
                  </Link>
                  <Link href="/my-bids" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    My Bids
                  </Link>
                  <Link href="/messages" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Messages
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-primary-600">
                  {session.user?.name || session.user?.email}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
