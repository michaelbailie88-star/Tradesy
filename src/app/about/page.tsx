import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About — Vettd",
  description: "Learn about Vettd — the trusted marketplace connecting homeowners and businesses with verified local tradespeople.",
};

import Link from "next/link";

// ──────────────────────────────────────────────
// Value Card
// ──────────────────────────────────────────────
function ValueCard({ icon, title, desc, gradient }: { icon: string; title: string; desc: string; gradient: string }) {
  return (
    <div className="card text-center p-6 hover:shadow-card-elevated transition-all group">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="font-bold text-[#163D75] mb-2">{title}</h3>
      <p className="text-sm text-[#6B6358] leading-relaxed">{desc}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// Stat Block
// ──────────────────────────────────────────────
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6">
      <p className="text-4xl md:text-5xl font-extrabold gradient-text mb-1">{value}</p>
      <p className="text-sm text-[#6B6358]">{label}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// Team Member Card
// ──────────────────────────────────────────────
function TeamCard({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className="card text-center p-6 hover:shadow-card-elevated transition-all">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2852C7] to-[#1E4D92] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-md">
        {initials}
      </div>
      <h3 className="font-bold text-[#163D75]">{name}</h3>
      <p className="text-sm text-[#6B6358]">{role}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// Timeline Item (Our Story)
// ──────────────────────────────────────────────
function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="relative pl-8 pb-10 border-l-2 border-[#E2DDD6] last:border-transparent last:pb-0">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#2852C7] border-2 border-[#FCFBFA]" />
      <span className="text-sm font-bold text-[#2852C7]">{year}</span>
      <h3 className="text-lg font-bold text-[#163D75] mt-0.5">{title}</h3>
      <p className="text-sm text-[#6B6358] mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// About Page
// ──────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-noise">

      {/* ═══════ HERO ═══════ */}
      <section className="relative bg-gradient-to-br from-[#1A3370] via-[#1E4D92] to-[#2852C7] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#E8911A] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-[#E8911A] rounded-full blur-2xl" />
        </div>
        <div className="relative container-content py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Trusted by thousands of homeowners &amp; pros</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              <span className="text-white">About</span>
              <br />
              <span className="bg-gradient-to-r from-[#FCD34D] via-[#F59E0B] to-[#E8911A] bg-clip-text text-transparent">Vettd</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re on a mission to make hiring a home pro as easy, safe, and transparent as ordering a ride.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#E8911A]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Verified
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300/50" />
              <span>Licensed</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300/50" />
              <span>Insured</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300/50" />
              <span>Background Checked</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F5F0] to-transparent" />
      </section>

      {/* ═══════ MISSION ═══════ */}
      <section className="py-16 md:py-20">
        <div className="container-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary text-xs tracking-widest uppercase mb-4 inline-block">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#163D75] mb-6">
              Connecting Trusted Pros with the People Who Need Them
            </h2>
            <p className="text-lg text-[#6B6358] leading-relaxed mb-4">
              Every year, millions of homeowners and businesses struggle to find reliable tradespeople. 
              They rely on word-of-mouth, expensive directory listings, or gamble on unvetted workers. 
              Meanwhile, skilled contractors spend thousands on advertising just to find their next job.
            </p>
            <p className="text-lg text-[#6B6358] leading-relaxed">
              Vettd was built to fix this. We create a trusted marketplace where homeowners and 
              businesses find verified, licensed, and insured pros — and where contractors grow 
              their business without expensive ads.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ DECORATIVE DIVIDER ═══════ */}
      <div className="section-divider" />

      {/* ═══════ OUR STORY ═══════ */}
      <section className="py-16 md:py-20 bg-warm-noise">
        <div className="container-content">
          <div className="text-center mb-4">
            <span className="badge-accent text-xs tracking-widest uppercase">Our Story</span>
          </div>
          <h2 className="section-heading">How <span className="gradient-text">Vettd</span> Began</h2>
          <p className="section-subheading">From a frustration to a mission — the journey so far.</p>

          <div className="max-w-2xl mx-auto mt-8">
            <TimelineItem
              year="2024"
              title="The Idea"
              desc="After multiple bad experiences finding reliable contractors, our founders realized the home services industry was broken. No transparency, no trust, no accountability."
            />
            <TimelineItem
              year="Early 2025"
              title="Building the Platform"
              desc="We assembled a team of engineers, designers, and industry experts to build a marketplace that prioritizes trust, transparency, and quality."
            />
            <TimelineItem
              year="Mid 2025"
              title="Launch in Portland"
              desc="Vettd launched in Portland, Oregon with 50 vetted contractors and 200 early-access homeowners. The response was overwhelming."
            />
            <TimelineItem
              year="2026"
              title="Growing Nationwide"
              desc="Now serving multiple cities across the US, Vettd has helped thousands of homeowners find trusted pros and helped contractors grow their businesses."
            />
          </div>
        </div>
      </section>

      {/* ═══════ DECORATIVE DIVIDER ═══════ */}
      <div className="section-divider" />

      {/* ═══════ STATS ═══════ */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EBF0F8]/50 to-[#F7F5F0]" />
        <div className="relative container-content">
          <div className="text-center mb-4">
            <span className="badge-primary text-xs tracking-widest uppercase">By the Numbers</span>
          </div>
          <h2 className="section-heading">Vettd in <span className="gradient-text">Numbers</span></h2>
          <p className="section-subheading">Our growing community of trusted pros and happy homeowners.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm">
              <StatBlock value="500+" label="Verified Pros" />
            </div>
            <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm">
              <StatBlock value="2,000+" label="Jobs Completed" />
            </div>
            <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm">
              <StatBlock value="4.8" label="Average Rating" />
            </div>
            <div className="bg-[#FCFBFA] rounded-xl border border-[#E2DDD6] shadow-sm">
              <StatBlock value="98%" label="Satisfaction Rate" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ VALUES ═══════ */}
      <section className="py-16 md:py-20 bg-warm-noise">
        <div className="container-content">
          <div className="text-center mb-4">
            <span className="badge-accent text-xs tracking-widest uppercase">What We Stand For</span>
          </div>
          <h2 className="section-heading">Our <span className="gradient-text">Values</span></h2>
          <p className="section-subheading">The principles that guide everything we build.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <ValueCard
              icon="🛡️"
              title="Trust First"
              desc="Every pro on Vettd is verified — licenses, insurance, and background checks. No exceptions."
              gradient="from-[#EBF0F8] to-[#D6E2F1]"
            />
            <ValueCard
              icon="🔍"
              title="Full Transparency"
              desc="Real reviews, clear pricing, and open communication. No hidden fees, no surprises."
              gradient="from-[#FFF8ED] to-[#FEF0D5]"
            />
            <ValueCard
              icon="🤝"
              title="Fair to Everyone"
              desc="Homeowners get free bids. Contractors pay no ad costs — just a fair commission on completed work."
              gradient="from-[#ECFDF5] to-[#D1FAE5]"
            />
            <ValueCard
              icon="⭐"
              title="Quality Focused"
              desc="We don't just list anyone. Our vetting process ensures only the best pros make it onto Vettd."
              gradient="from-[#EBF0F8] to-[#D6E2F1]"
            />
            <ValueCard
              icon="💬"
              title="Community Driven"
              desc="Reviews and ratings from real customers keep our community accountable and continuously improving."
              gradient="from-[#FFF8ED] to-[#FEF0D5]"
            />
            <ValueCard
              icon="🔒"
              title="Secure Payments"
              desc="Milestone-based escrow protects both parties. Funds release only when the job is done right."
              gradient="from-[#ECFDF5] to-[#D1FAE5]"
            />
          </div>
        </div>
      </section>

      {/* ═══════ DECORATIVE DIVIDER ═══════ */}
      <div className="section-divider" />

      {/* ═══════ THE VETTD DIFFERENCE ═══════ */}
      <section className="py-16 md:py-20">
        <div className="container-content">
          <div className="text-center mb-4">
            <span className="badge-primary text-xs tracking-widest uppercase">Why Choose Us</span>
          </div>
          <h2 className="section-heading">The <span className="gradient-text">Vettd</span> Difference</h2>
          <p className="section-subheading">What sets us apart from traditional home service platforms.</p>

          <div className="max-w-4xl mx-auto">
            {[
              { icon: "✅", title: "Every Pro is Vetted", desc: "We verify licenses, insurance, and run background checks on every contractor before they can list on Vettd. No anonymous profiles, no unverified claims." },
              { icon: "💰", title: "Free to Post, Fair to Bid", desc: "Homeowners post jobs for free. Contractors pay only 10% on completed work — no monthly fees, no ad spend required to get leads." },
              { icon: "🔄", title: "Transparent Bidding", desc: "See all bids side by side. Compare prices, reviews, and availability. You choose the best pro for your project and budget." },
              { icon: "🛡️", title: "Secure Escrow Payments", desc: "Funds are held in escrow and released in milestones. You only pay when you're satisfied with the completed work." },
              { icon: "💬", title: "Real Reviews from Real People", desc: "Both homeowners and contractors rate each other after every job. Our review system keeps everyone accountable." },
              { icon: "🏢", title: "Built for Homeowners & Businesses", desc: "From residential repairs to commercial fit-outs, Vettd connects property owners of all types with the right pros for the job." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 p-5 md:p-6 rounded-xl bg-[#FCFBFA] border border-[#E2DDD6] mb-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EBF0F8] to-[#D6E2F1] flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#163D75] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#6B6358] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DECORATIVE DIVIDER ═══════ */}
      <div className="section-divider" />

      {/* ═══════ TEAM ═══════ */}
      <section className="py-16 md:py-20 bg-warm-noise">
        <div className="container-content">
          <div className="text-center mb-4">
            <span className="badge-accent text-xs tracking-widest uppercase">Leadership</span>
          </div>
          <h2 className="section-heading">Meet the <span className="gradient-text">Team</span></h2>
          <p className="section-subheading">The people building a better way to hire home pros.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <TeamCard initials="MB" name="Michael B." role="Founder & CEO" />
            <TeamCard initials="AL" name="Alex L." role="CTO" />
            <TeamCard initials="JR" name="Jordan R." role="Head of Operations" />
            <TeamCard initials="SK" name="Sarah K." role="Head of Trust & Safety" />
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3370] via-[#1E4D92] to-[#2852C7]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E8911A] rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative container-content">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-4">🔨</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              Whether you&apos;re a homeowner with a to-do list or a pro looking for your next job, Vettd is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-accent btn-lg shadow-lg shadow-[#E8911A]/25 text-center">
                Join Vettd Today
              </Link>
              <Link href="/jobs" className="inline-flex items-center justify-center font-semibold rounded-button px-8 py-4 text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all">
                Browse Open Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-[#1A1A18] text-[#8C857A] pt-16 pb-8">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-[#E2DDD6] font-semibold mb-4 text-sm uppercase tracking-wider">For Homeowners</h4>
              <ul className="space-y-2.5">
                <li><Link href="/signup" className="text-sm hover:text-[#E2DDD6] transition-colors">Post a Job</Link></li>
                <li><Link href="/contractors" className="text-sm hover:text-[#E2DDD6] transition-colors">Find a Pro</Link></li>
                <li><Link href="/" className="text-sm hover:text-[#E2DDD6] transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E2DDD6] font-semibold mb-4 text-sm uppercase tracking-wider">For Pros</h4>
              <ul className="space-y-2.5">
                <li><Link href="/signup" className="text-sm hover:text-[#E2DDD6] transition-colors">Join as a Pro</Link></li>
                <li><Link href="/dashboard" className="text-sm hover:text-[#E2DDD6] transition-colors">Pro Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E2DDD6] font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-sm text-[#E2DDD6] font-medium hover:text-white transition-colors">About</Link></li>
                <li><span className="text-sm text-[#6B6358]">Blog</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E2DDD6] font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-[#6B6358]">Help Center</span></li>
                <li><span className="text-sm text-[#6B6358]">Privacy</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2D2A25] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-[#E2DDD6]">Vettd</span>
              <span className="text-xs text-[#6B6358]">© 2026 Vettd. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#6B6358]">
              <span>✓ Licensed</span><span>✓ Insured</span><span>✓ Background Checked</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}