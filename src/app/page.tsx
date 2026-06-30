"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const categories = [
  { name: "Plumbing", icon: "🔧", desc: "Pipe repairs, fixtures, water heaters" },
  { name: "Electrical", icon: "⚡", desc: "Wiring, outlets, lighting installation" },
  { name: "Roofing", icon: "🏠", desc: "Repairs, replacements, inspections" },
  { name: "Landscaping", icon: "🌿", desc: "Gardens, lawns, hardscaping" },
  { name: "Painting", icon: "🎨", desc: "Interior & exterior, refinishing" },
  { name: "HVAC", icon: "❄️", desc: "Heating, cooling, ventilation" },
  { name: "Carpentry", icon: "🔨", desc: "Custom builds, shelving, trim" },
  { name: "Flooring", icon: "📐", desc: "Hardwood, tile, laminate installation" },
  { name: "Handyman", icon: "🛠️", desc: "Odd jobs, fixes, general repairs" },
  { name: "Cleaning", icon: "✨", desc: "Deep cleaning, move-out, windows" },
];

const steps = [
  { step: "01", title: "Post Your Job", desc: "Tell us about your project — describe the work, set your budget, and share photos. Takes 2 minutes.", color: "bg-primary-100 text-primary-600" },
  { step: "02", title: "Get Free Bids", desc: "Receive quotes from top-rated local pros. Compare reviews, prices, and availability.", color: "bg-accent-100 text-accent-700" },
  { step: "03", title: "Hire with Confidence", desc: "Choose your pro, agree on scope, and pay through secure escrow — funds release when you're satisfied.", color: "bg-success/10 text-success" },
];

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative container-content py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-white/90 font-medium">All pros are licensed, insured & background checked</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Your home. <br /><span className="text-accent-400">Our pros.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl leading-relaxed">
              Find trusted, verified local tradespeople for any home project. Post your job and get free bids from top-rated pros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href={session ? "/post-job" : "/signup"} className="btn-accent btn-lg text-center">
                Post Your Job — Get Free Bids
              </Link>
              <Link href="#categories" className="inline-flex items-center justify-center font-semibold rounded-button px-6 py-4 text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                Browse Professionals
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-200">
              <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Verified</span>
              <span className="w-1 h-1 rounded-full bg-primary-300" />
              <span className="flex items-center gap-1">✓ Licensed</span>
              <span className="w-1 h-1 rounded-full bg-primary-300" />
              <span className="flex items-center gap-1">✓ Insured</span>
              <span className="w-1 h-1 rounded-full bg-primary-300" />
              <span className="flex items-center gap-1">✓ Background Checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="container-content">
          <h2 className="section-heading">How Tradesy Works</h2>
          <p className="section-subheading">Three simple steps to get your home project done right.</p>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((item, i) => (
              <div key={i} className="text-center relative">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-lg font-bold ${item.color}`}>{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                {i < steps.length - 1 && <div className="hidden md:block absolute top-8 -right-6 text-gray-300 text-2xl">→</div>}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={session ? "/post-job" : "/signup"} className="btn-primary btn-lg">Get Started Now</Link>
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORIES ═══════ */}
      <section id="categories" className="py-16 md:py-24">
        <div className="container-content">
          <h2 className="section-heading">Find the Right Pro for Any Job</h2>
          <p className="section-subheading">Browse top-rated professionals in your area, for every project around the house.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/signup" className="card flex flex-col items-center text-center p-5 hover:border-primary-200 hover:bg-primary-50/50 group">
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h4>
                <p className="text-xs text-gray-400">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRUST ═══════ */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="container-content">
          <h2 className="section-heading">Every Pro is Verified</h2>
          <p className="section-subheading">We verify every contractor so you can hire with confidence.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛡️", title: "Background Checked", desc: "Criminal background checks on every pro" },
              { icon: "📋", title: "License Verified", desc: "Valid trade licenses confirmed" },
              { icon: "🔒", title: "Insurance Protected", desc: "Liability & workers' comp verified" },
              { icon: "⭐", title: "Reviewed By You", desc: "Real ratings from real homeowners" },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-card border border-primary-100 p-6 text-center hover:shadow-card-elevated transition-shadow">
                <span className="text-4xl block mb-4">{p.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white rounded-card border border-primary-100 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <span className="verified-badge text-sm px-4 py-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Verified</span>
              <span className="badge-primary text-sm px-4 py-2">📋 Licensed</span>
              <span className="badge-primary text-sm px-4 py-2">🛡️ Insured</span>
              <span className="badge-primary text-sm px-4 py-2">🔍 Background Checked</span>
              <span className="badge-accent text-sm px-4 py-2">⭐ Top Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <h2 className="section-heading">Trusted by Homeowners & Pros</h2>
          <p className="section-subheading">Join thousands who found their perfect match on Tradesy.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", location: "Portland, OR", quote: "Found an amazing plumber through Tradesy within hours. The transparent bidding process made it so easy to choose the right pro." },
              { name: "James L.", location: "Austin, TX", quote: "As a contractor, Tradesy has been a game-changer. No more expensive ads — just quality leads that convert." },
              { name: "Maria G.", location: "Denver, CO", quote: "Needed an emergency roof repair after a storm. Had 4 bids within 2 hours. The verified badges gave me confidence to hire fast." },
            ].map((t, i) => (
              <div key={i} className="card border-gray-100 hover:border-primary-100">
                <div className="stars mb-4">{Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="w-5 h-5 star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}</div>
                <p className="text-gray-600 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="avatar">{t.name.charAt(0)}</div>
                  <div><p className="font-semibold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-400">{t.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DUAL CTA ═══════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container-content">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 md:p-10 text-center md:text-left border border-white/20">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-white mb-2">Need a Home Pro?</h3>
              <p className="text-primary-100 mb-6 leading-relaxed">Post your project and get free bids from verified local tradespeople. No commitment.</p>
              <Link href={session ? "/post-job" : "/signup"} className="inline-flex items-center justify-center btn-accent btn-lg w-full md:w-auto">Post a Job — It&apos;s Free</Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 md:p-10 text-center md:text-left border border-white/20">
              <div className="text-4xl mb-4">🔨</div>
              <h3 className="text-2xl font-bold text-white mb-2">Are You a Pro?</h3>
              <p className="text-primary-100 mb-6 leading-relaxed">Stop chasing leads. Join Tradesy and get matched with qualified homeowners ready to hire.</p>
              <Link href="/signup" className="inline-flex items-center justify-center font-semibold rounded-button px-8 py-4 text-white border-2 border-white/30 hover:bg-white/10 transition-all w-full md:w-auto">Join as a Contractor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">For Homeowners</h4><ul className="space-y-2.5">
              <li><Link href="/signup" className="text-sm hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="#categories" className="text-sm hover:text-white transition-colors">Find a Pro</Link></li>
              <li><Link href="#how-it-works" className="text-sm hover:text-white transition-colors">How It Works</Link></li>
            </ul></div>
            <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">For Pros</h4><ul className="space-y-2.5">
              <li><Link href="/signup" className="text-sm hover:text-white transition-colors">Join as a Pro</Link></li>
              <li><Link href="/dashboard" className="text-sm hover:text-white transition-colors">Pro Dashboard</Link></li>
            </ul></div>
            <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4><ul className="space-y-2.5">
              <li><span className="text-sm text-gray-500">About Us</span></li>
              <li><span className="text-sm text-gray-500">Blog</span></li>
            </ul></div>
            <div><h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4><ul className="space-y-2.5">
              <li><span className="text-sm text-gray-500">Help Center</span></li>
              <li><span className="text-sm text-gray-500">Safety</span></li>
              <li><span className="text-sm text-gray-500">Privacy</span></li>
            </ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white/70">Tradesy</span>
              <span className="text-xs text-gray-600">© 2026 Tradesy. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>✓ Licensed</span><span>✓ Insured</span><span>✓ Background Checked</span><span>✓ Verified Reviews</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}