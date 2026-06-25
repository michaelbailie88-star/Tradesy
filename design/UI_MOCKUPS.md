# Tradesy UI Mockups & Page Layouts

> References for the Full-Stack Engineer to implement.
> All designs are mobile-first, responsive, and follow the Brand Style Guide.

---

## Layout Overview

```
[Header]          — Sticky, max 72px
[Hero/Section]    — Varies by page
[Content Grid]    — 12-column responsive grid
[Footer]          — 4-column, max 400px per col
```

**Max content width:** 1200px, centered with auto margins.

---

## Page 1: Landing Page (Homeowners)

### Header
- **Left:** Tradesy logo (SVG) — links to home
- **Center (desktop only):** Nav links — "How It Works", "Find a Pro", "For Contractors", "About"
- **Right:** "Post a Job" (Accent amber button) | "Sign In" (Ghost button)
- **Mobile (< lg):** Hamburger menu > slide-out drawer with same links
- **Background:** White, bottom border 1px Gray-200

### Hero Section
- **Background:** Full-bleed hero image (tradesy-hero-image.png) with dark gradient overlay at bottom
- **Headline:** "Your home. Our pros." — white, 48px Bold, tight letter-spacing
- **Subheadline:** "Find trusted, verified local tradespeople for any home project." — white, 20px Regular
- **CTA:** "Post Your Job — Get Free Bids" (Accent amber button, Large, 48px height) + "Browse Professionals" (White ghost/outline button)
- **Trust bar below CTA:** "✓ All pros are licensed, insured & background checked"
- **Mobile:** Stack vertically, reduce headline to 32px

### How It Works Section
- **Background:** Gray-50
- **Heading:** "How Tradesy Works" (H2, centered)
- **3-step layout (desktop: row, mobile: stack):**

```
[ Step 1 ]       [ Step 2 ]        [ Step 3 ]
  📋 Post Your     🤝 Get Bids       ✅ Hire & Pay
    Job                                Securely

  Describe your   Receive quotes    Review ratings,
  project, set    from top-rated    choose your pro,
  budget &        local pros in     and pay through
  timeline.       24 hours.         secure escrow.
```

- Each step: Icon in circle (48px, Primary-100 bg), Title (H4), Description (Body, Gray-700)
- **Below steps:** "Get Started" (Primary button)

### Browse Categories Section
- **Background:** White
- **Heading:** "Find the Right Pro for Any Job" (H2)
- **10 category cards in responsive grid:**
  - Desktop: 5 columns x 2 rows
  - Tablet: 4 columns
  - Mobile: 2 columns
- **Each card:** Icon (from categories-grid), Category name (H4), "XX pros available" (Caption, Gray-500), "Starting at $XX" (Body Small)
- Cards are white with Gray-200 border, 12px radius, hover lift shadow

### Trust & Safety Section
- **Background:** Primary-50
- **Heading:** "Every Pro is Verified" (H2)
- **4 trust pillars:**
  1. 🔒 Background Checked — "Criminal background checks on every pro"
  2. 📋 License Verified — "Valid trade licenses confirmed"
  3. 🛡️ Insurance Protected — "Liability & workers' comp verified"
  4. ⭐ Reviewed By You — "Real ratings from real neighbors"
- Each pillar: Icon (32px), Title (H4), Description (Body, Gray-700)
- **Grid:** 4 columns desktop, 2 tablet, 1 mobile

### Testimonials Section
- **Background:** Gray-50
- **Heading:** "Trusted by Homeowners & Pros" (H2)
- 3 testimonial cards in a row
- Each card: Avatar (48px round), Name, Location, Star rating (5 amber stars), Quote (Body italic)
- Carousel on mobile (swipeable)

### Footer
- 4 columns: "For Homeowners", "For Pros", "Company", "Support"
- Column 1 links: Post a Job, Find a Pro, How It Works, Pricing
- Column 2 links: Join as Pro, Pro Dashboard, Success Stories, Resource Center
- Column 3 links: About Us, Blog, Careers, Press
- Column 4 links: Help Center, Safety, Privacy Policy, Terms
- Bottom bar: © 2026 Tradesy. All rights reserved. | Social icons

---

## Page 2: Sign Up / Login

### Layout
- **Desktop:** Left panel (branding/illustration) + Right panel (form)
- **Mobile:** Full-screen form, no left panel

### Left Panel
- Logo at top
- Illustration or key trust message
- "Join 10,000+ homeowners who found their perfect pro" (H3, Gray-900)
- Trust badges row (verified, insured, background checked)

### Right Panel (Form)
- **Tab/switch:** "Homeowner" | "Contractor" (two user types)
- **Tabs:** Pill-shaped toggle, Primary-600 for active, Gray-200 for inactive
- **Form fields:**
  - Full Name (text input)
  - Email (email input)
  - Phone (optional, tel input)
  - Password (password input + show/hide toggle)
  - ZIP Code (text, 5 digits)
- **Checkbox:** "I agree to the Terms of Service and Privacy Policy"
- **CTA:** "Create Account" (Primary blue button, full-width)
- **Divider:** "or continue with" — Google, Apple buttons
- **Footer link:** "Already have an account? Sign In"

### Contractor Sign-Up Includes Extra Fields:
- Trade specialty (dropdown: "Select your trade…")
- License number (text)
- Insurance info (text)
- Years in business (number)
- Service area radius (dropdown: "Within 10/25/50 miles")
- "I am a licensed and insured professional" checkbox

---

## Page 3: Job Board (Homeowner Dashboard)

### Header
- Same as landing, but with "My Jobs" link active

### Top Bar
- **Left:** "Job Board" heading
- **Right:** "Post a New Job" button (Accent amber)

### Filter Bar
- Category dropdown (All, Plumbing, Electrical, …)
- Budget range slider
- Location/ZIP input
- Sort: "Most Recent" | "Highest Budget" | "Most Bids"

### Job Cards (Grid)
- **Desktop:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1 column

#### Job Card Spec
```
┌─────────────────────────┐
│ [Category Badge] [New]   │
│                         │
│ 🏠 Fix Leaky Kitchen    │
│    Sink                  │
│                         │
│ 📍 123 Oak St, Portland │
│ 💰 Budget: $200-$400    │
│ 📅 Posted 2h ago        │
│ ─────────────────────   │
│ 👥 3 Bids  |  ⭐ 4.8    │
│  [View Details →]       │
└─────────────────────────┘
```

- **Category Badge:** Primary-50 bg, Primary-600 text, 4px radius pill
- **"New" badge:** Accent-100 bg, Accent-700 text
- **Card radius:** 12px, shadow: card default
- **Hover:** Slight lift (card-elevated shadow)

### Empty State (no jobs yet)
- Illustration: clipboard with checklist
- "No jobs yet! Post your first project to get bids from top pros."
- CTA: "Post a Job Now"

---

## Page 4: Post a Job (Homeowner)

### Multi-Step Form

**Step 1: Tell us about your project**
- Category dropdown (required)
- Job title (text, max 100 chars) — "e.g., Fix leaking kitchen sink"
- Description (textarea, max 500 chars) — "Describe the work needed in detail"
- Upload photos (drag & drop or click, up to 5 images, preview thumbnails)

**Step 2: Set your details**
- Budget range (min/max number inputs)
- Timeline (dropdown): "As soon as possible", "This week", "This month", "Flexible"
- Location (autocomplete / ZIP + map pin)
- "I'd prefer to work with..." (checkbox group): "Licensed pros only", "Insured pros only", "Top-rated (4.5+ stars)"

**Step 3: Review & Post**
- Summary card showing all entered info
- Checkbox: "Feature my job for $14.99 — get priority visibility"
- **CTA:** "Post Job — Get Free Bids" (Accent amber, Large)
- **Cancel:** "Save as Draft" (Ghost button)

### Progress Bar
- Step indicator at top: 1 → 2 → 3
- Current step highlighted (Primary-600), completed steps (Success green checkmark)

---

## Page 5: Job Detail Page (Homeowner)

### Layout
- **Left:** Job details (2/3 width on desktop)
- **Right:** Bids sidebar (1/3 width on desktop)

### Job Header
- Category badge | Status badge ("Open for Bids", "In Progress", "Completed")
- Job title (H2)
- Posted date | Location | Job ID

### Job Body
- Description (Body, Gray-700)
- Photo gallery (thumbnails, click to enlarge)
- Budget range (highlighted card)
- Timeline

### Bids Section (Right sidebar on desktop, below on mobile)
- **Heading:** "Bids (3)" with count
- **Each bid card:**
```
┌─────────────────────────┐
│ [Avatar]  Mike's Plumb. │
│           ⭐ 4.9 (24)   │
│           ✓ Verified    │
│                         │
│ 💰 $350                 │
│ 📅 Available: Tomorrow  │
│ 📝 "I can fix this     │
│    same-day!"           │
│                         │
│  [View Profile] [Accept]│
└─────────────────────────┘
```
- **Accept button:** Success green
- **View Profile:** Ghost button

### Proposal Detail (expandable)
- Scope of work text
- Estimated duration
- Materials included / extra
- Warranty offered

---

## Page 6: Contractor Profile Page

### Header Section
- Cover image (optional, default gradient Primary-100 to Primary-200)
- Avatar (96px round, white border)
- Business name (H2)
- "Pro Member" badge (Primary-600)
- Location & service area
- **Trust badges row:** Verified ✓ | Licensed ✓ | Insured ✓ | Background Checked ✓

### Stats Bar
- ⭐ 4.9 (87 reviews)
- 🛠️ 142 jobs completed
- ✅ 98% on-time
- ⏱️ Responds in < 2 hours

### About Section
- "About" (H3)
- Bio text (Body, Gray-700)
- Years in business
- Specialties (tag pills)
- Service areas

### Portfolio / Recent Work
- **Grid:** 3 columns (desktop)
- **Each:** Photo thumbnail, caption ("Kitchen remodel - June 2026")
- Click to enlarge

### Reviews Section
- Overall rating (large number + star visualization)
- Rating breakdown: 5★ (75), 4★ (10), 3★ (2), 2★ (0), 1★ (0) — horizontal bars
- **Review cards:**
  - Avatar + Name + Date
  - Star rating
  - Review text
  - "Verified homeowner" badge
- Sort: "Most Recent" | "Highest Rated" | "Lowest Rated"

### Call-to-Action
- "Request a Quote" (Accent amber button, Large, sticky on mobile)

---

## Page 7: Contractor Dashboard

### Sidebar/Nav (Desktop)
- **Dashboard** (overview stats)
- **My Bids** (active/archived)
- **Jobs Won** (in progress, completed)
- **Reviews** (recent, response)
- **Profile** (edit portfolio, license, availability)
- **Payments** (earnings, payout history)
- **Settings** (notifications, account)

### Overview Stats Cards
| Metric | Value | Trend |
|--------|-------|-------|
| Active Bids | 8 | ↑ +2 this week |
| Jobs in Progress | 3 | |
| Completed This Month | 12 | ↑ +15% vs last month |
| Total Earned (MTD) | $4,250 | |
| Avg. Rating | 4.9★ | |
| Response Rate | 95% | ⚡ Fast responder badge |

### Recent Job Listings
- **Desktop:** Table view
- **Mobile:** Card view
- Columns: Job Title | Budget | Location | Posted | Bid Status | Action

### Bid Status Tags
- "Submitted" (Gray-300)
- "Viewing" (Primary-100, Primary-600 text)
- "Shortlisted" (Amber-100, Amber-700 text)
- "Accepted" (Success-100, Success green text)
- "Declined" (Red-100, Red text)
- "Expired" (Gray-100, Gray-500 text)

---

## Page 8: Checkout / Secure Payment

### Layout
- **Left:** Order summary (2/3)
- **Right:** Payment card (1/3)

### Order Summary
- Job title & description summary
- Contractor name + avatar
- Agreed price (Bold, H3)
- Milestone breakdown (if applicable)

### Payment Card
- "Secure Payment via Stripe" — lock icon, green
- Milestone-based escrow: "Funds held securely until job is complete"
- Amount display
- **Payment method:** Card input (Stripe Elements) or saved card
- **CTA:** "Send Payment — $X"
- **Trust note:** "Your payment is only released when you approve the work."

### Confirmation Page
- "Payment Sent!" success animation
- Order reference number
- "Next: Your pro will confirm and schedule the job."
- **Buttons:** "Message Your Pro", "View Job Status", "Back to Dashboard"

---

## Page 9: Messaging / Chat

### Layout
- **Desktop:** Side-by-side (contact list | active conversation)
- **Mobile:** Full-screen chat, contact list as initial view

### Contact List
- Avatar + Name + Last message preview + Time + Unread badge (Primary-600)

### Chat View
- Chat bubble: sender (Gray-100 bg, Gray-900 text), receiver (Primary-600 bg, white text)
- Timestamps: "Today 2:30 PM"
- "Job reference" system message at top (Primary-100 bg)
- **Input:** Text field + Attachment (paperclip) + Send button (Primary-600)
- **Quick replies:** "Sounds good!", "On my way!", "Can we reschedule?"
- **Read receipts:** Double checkmarks (Gray-500 = delivered, Primary-600 = read)

---

## Page 10: Reviews & Ratings

### After Job Completion
Toast notification: "Your job is complete! Rate your experience with [Contractor Name]"

### Review Form
- **Overall rating:** 5-star clickable scale (amber stars)
- **Categories** (optional, each 5-star scale):
  - Quality of work
  - Communication
  - Timeliness
  - Cleanliness
- **Review text** (textarea, max 300 chars)
- **Photo upload** (optional, up to 3)
- **Would you recommend?** Yes / No toggle
- **CTA:** "Submit Review" (Primary button)

### Thank You Screen
- "Thanks for your feedback!"
- "Your review helps other homeowners find great pros."

---

## Trust & Security Signals (Recurring Elements)

### Every Page Footer
- Trust badges row: "✓ Licensed" "✓ Insured" "✓ Background Checked" "✓ Verified Reviews"

### Checkout & Sign Up
- SSL lock icon: "256-bit encryption"
- Stripe badge on payment pages

### Job Cards & Contractor Cards
- Verified checkmark (green) on contractor name
- Star rating always visible
- "XX jobs completed" stat

### Header
- "Pros are verified" pill banner (subtle, Gray-100 bg) — optional, rotates messages

---

## Responsive Behavior Summary

| Element | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| Grid | 12 columns | 8 columns | 4 columns |
| Header | Full nav | Full nav | Hamburger |
| Job grid | 3 columns | 2 columns | 1 column |
| Category cards | 5 columns | 4 columns | 2 columns |
| Contractor profile | 2/3 + 1/3 sidebar | Stack | Stack |
| Post a Job | Side-by-side steps | Stack | Stack |
| Chat | Side-by-side | Stack | Full-screen |
| Footer | 4 columns | 2 columns | 1 column |

---

## Animation & Interaction Notes

| Element | Animation |
|---------|-----------|
| Button hover | Background color 150ms ease, slight scale (1.02) |
| Card hover | Shadow transition 200ms, translateY(-2px) |
| Page transitions | Fade in 200ms |
| Modal/overlay | Fade + scale 200ms, backdrop blur |
| Mobile menu | Slide from right 250ms ease-out |
| Star rating | Hover: fill amber, click: bounce 100ms |
| Toast notifications | Slide down 300ms, auto-dismiss 5s |
| Bid accept | Success checkmark animation, card highlight |
| Form errors | Shake 300ms on validation fail |
| Loading states | Skeleton shimmer (Gray-100 base, Gray-200 shimmer) |

---

## Success & Empty States

### Empty State Pattern
- Centered illustration (80px)
- Title (H3)
- Description (Body, Gray-500)
- CTA button (if applicable)

### Examples
| Page | Empty State | CTA |
|------|-------------|-----|
| Job Board | "No jobs match your filters" | "Clear filters" or "Post a Job" |
| Bids List | "No bids received yet" | "Share your job" |
| Messages | "No conversations yet" | "Find a Pro to get started" |
| Contractor Dashboard | "No active bids" | "Browse available jobs" |

---

*This document maps every screen the engineer needs to build. All UI tokens reference the Brand Style Guide.*