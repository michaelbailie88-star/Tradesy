# Tradesy Design Assets

**Directory:** `/home/team/shared/tradesy-app/design/`

## Contents

| File | Type | Description |
|------|------|-------------|
| `BRAND_STYLE_GUIDE.md` | Documentation | Complete brand identity — colors, typography, logo, icons, spacing, voice & tone |
| `UI_MOCKUPS.md` | Documentation | Full page layouts for every screen — landing, signup, job board, detail, profile, dashboard, checkout, chat, reviews |
| `COLOR_SWATCHES.svg` | Asset | Visual color palette reference for engineer implementation |
| `tradesy-logo.svg` | Asset | **Production-ready SVG logo** (shield + tool mark + wordmark + tagline) |
| `tradesy-logo.png` | Asset | Logo render (1024×1024) |
| `tradesy-hero-image.png` | Asset | Hero banner photo — contractor shaking hands with homeowner (1536×1024) |
| `tradesy-categories-grid.png` | Asset | 10 trade category icons in a clean grid (1536×1024) |
| `tradesy-trust-badges.png` | Asset | 6 trust verification badges — Verified, Licensed, Insured, Background Checked, Top Rated, Pro Member (1536×1024) |

## Brand Quick Reference

| Element | Value |
|---------|-------|
| **Primary** | `#2563EB` (Blue) — trust, reliability |
| **Accent** | `#F59E0B` (Amber) — CTAs, energy, ratings |
| **Success** | `#059669` (Green) — verified badges, checkmarks |
| **Font** | Inter (sans-serif) |
| **Tagline** | "Your home, our pros" |
| **Logo** | Shield + crossed tools mark + "Tradesy" wordmark |

## For the Engineer

### Tailwind Config
Copy the token reference from `BRAND_STYLE_GUIDE.md` Section 10.

### Logo Implementation
Use `tradesy-logo.svg` directly in the header. The SVG includes:
- A blue shield (gradient) with white crossed wrench/screwdriver
- "Tradesy" wordmark in dark gray
- "YOUR HOME, OUR PROS" tagline in medium gray
- Responsive viewBox (300×80)

### Mobile First
All layouts in `UI_MOCKUPS.md` are specified mobile-first with breakpoints at 480px, 768px, 1024px, and 1280px.

### Key Priority Pages
1. **Landing Page** — First impression, needs hero + categories + trust section
2. **Post a Job** — Core conversion flow for homeowners
3. **Job Board** — Discovery experience
4. **Contractor Profile** — Trust & persuasion
5. **Checkout** — Secure payment flow