"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-primary-600">Tradesy</h1>
        <nav className="space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-gray-700 hover:text-primary-600 font-medium">
                Hi, <strong>{session.user?.name}</strong> ({ session.user?.role })
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
          Your home, our pros.
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Find trusted, verified local tradespeople for any home project. 
          Post your job and get free bids from top-rated pros.
        </p>

        <div className="flex justify-center space-x-6">
          {session ? (
            session.user?.role === "HOMEOWNER" ? (
              <Link
                href="/post-job"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
              >
                Post a Job
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
              >
                Contractor Dashboard
              </Link>
            )
          ) : (
            <Link
              href="/signup"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
            >
              Get Started
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
