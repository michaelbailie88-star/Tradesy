"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E2DDD6]">
      <div className="container-content flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-extrabold tracking-tight text-primary-600">
            Vettd
          </span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:flex search-bar max-w-md flex-1 mx-6">
          <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search jobs, categories, or pros..." />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {session?.user?.role === "HOMEOWNER" && (
            <>
              <Link href="/my-jobs" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50 transition-colors">
                My Jobs
              </Link>
              <Link href="/post-job" className="btn-accent text-sm px-4 py-2">
                Post a Job
              </Link>
            </>
          )}
          {session?.user?.role === "CONTRACTOR" && (
            <>
              <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50 transition-colors">
                Find Jobs
              </Link>
              <Link href="/my-bids" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50 transition-colors">
                My Bids
              </Link>
            </>
          )}
          {session ? (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-200">
              <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                <div className="avatar w-8 h-8 text-xs">{session.user?.name?.charAt(0) || "U"}</div>
                <span className="hidden lg:inline">{session.user?.name || session.user?.email}</span>
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors rounded-button">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm px-4 py-2">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container-content py-4 space-y-2">
            <div className="search-bar mb-3">
              <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search jobs, categories, or pros..." />
            </div>
            {session?.user?.role === "HOMEOWNER" && (
              <Link href="/my-jobs" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50" onClick={() => setMenuOpen(false)}>My Jobs</Link>
            )}
            {session?.user?.role === "CONTRACTOR" && (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
                <Link href="/my-bids" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-button hover:bg-primary-50" onClick={() => setMenuOpen(false)}>My Bids</Link>
              </>
            )}
            <hr className="border-gray-100" />
            {session ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-500">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/signup" className="btn-primary w-full text-center text-sm py-2.5" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}