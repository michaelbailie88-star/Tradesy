# Tradesy Brand Style Guide

**Name:** Tradesy (Trades + Easy)
**Tagline:** "Your home, our pros"
**Version:** 1.0
**Date:** 2026-06-25
**Designer:** Agent Designer

---

## Brand Essence

Tradesy is the trusted marketplace connecting homeowners with verified local tradespeople. Every design decision communicates **trust, reliability, professionalism, and local expertise.**

### Brand Personality
| Trait | How It Shows |
|-------|-------------|
| **Trustworthy** | Clean blue primary, verified badges, transparent UI |
| **Professional** | Sharp typography, generous whitespace, consistent grid |
| **Local** | Warm amber accents, community-focused messaging |
| **Reliable** | Solid color blocks, clear hierarchy, predictable patterns |
| **Helpful** | Friendly illustrations, approachable CTAs, clear labels |

---

## 1. Color Palette

### Primary — Trustworthy Blue
| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#EFF6FF` | Light backgrounds, badges |
| `primary-100` | `#DBEAFE` | Section backgrounds, hover states |
| `primary-200` | `#BFDBFE` | Borders, dividers |
| `primary-500` | `#3B82F6` | Primary buttons, links, active states |
| `primary-600` | `#2563EB` | **Primary brand color** — main CTAs, header |
| `primary-700` | `#1D4ED8` | Button hover, focus rings |
| `primary-800` | `#1E40AF` | Active pressed states |

### Accent — Warm Amber (CTAs & Highlights)
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-50` | `#FFFBEB` | Highlight backgrounds, notification toasts |
| `accent-400` | `#FBBF24` | Star ratings, featured badges |
| `accent-500` | `#F59E0B` | **Accent CTAs** — "Post a Job", "Bid Now" |
| `accent-600` | `#D97706` | Accent hover states |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#059669` | Verified badges, completed status, checkmarks |
| `warning` | `#D97706` | Pending verification, warnings |
| `error` | `#DC2626` | Errors, required fields, negative indicators |
| `info` | `#0284C7` | Info banners, tips |

### Neutrals
| Token | Hex | Usage |
|-------|-----|-------|
| `gray-900` | `#111827` | Headings, primary text |
| `gray-700` | `#374151` | Body text |
| `gray-500` | `#6B7280` | Secondary/meta text |
| `gray-300` | `#D1D5DB` | Input borders, dividers |
| `gray-100` | `#F3F4F6` | Card backgrounds |
| `gray-50` | `#F9FAFB` | Page background |
| `white` | `#FFFFFF` | Card surfaces, modals |

### Color Usage Rules
- **Primary Blue (#2563EB)** for main navigation, primary buttons, brand headers
- **Amber (#F59E0B)** for conversion-focused CTAs (Post a Job, Get Bids, Bid Now)
- **Green (#059669)** exclusively for verified/trust indicators and completion states
- **Never use red for primary actions** — reserve for errors and destructive actions
- Text on colored backgrounds must meet WCAG AA contrast ratio (4.5:1 minimum)

---

## 2. Typography

### Primary Font: Inter
Clean, highly legible, excellent across all sizes. Perfect for both UI and marketing.

| Usage | Weight | Size | Line Height | Letter Spacing |
|-------|--------|------|-------------|----------------|
| **Display / H1** | Bold (700) | 48px / 3rem | 1.1 | -0.02em |
| **H2** | Bold (700) | 36px / 2.25rem | 1.2 | -0.01em |
| **H3** | Semibold (600) | 24px / 1.5rem | 1.3 | 0 |
| **H4** | Semibold (600) | 20px / 1.25rem | 1.4 | 0 |
| **Body Large** | Regular (400) | 18px / 1.125rem | 1.6 | 0 |
| **Body** | Regular (400) | 16px / 1rem | 1.6 | 0 |
| **Body Small** | Regular (400) | 14px / 0.875rem | 1.5 | 0 |
| **Caption / Label** | Medium (500) | 12px / 0.75rem | 1.4 | 0.01em |
| **Button / CTA** | Semibold (600) | 16px / 1rem | 1 | 0.01em |
| **Price / Amount** | Bold (700) | 20px / 1.25rem | 1 | 0 |

### Secondary Font: JetBrains Mono (Code/Monospace)
Used only for technical data: contractor license numbers, job IDs, reference codes.

### Typography Rules
- Maximum line width: 70 characters for body text
- Headings use tighter letter-spacing for impact
- Buttons are always uppercase for CTAs (optional sentence case for secondary actions)
- Never use underlines for non-link text
- Links are Primary-600 blue with hover underline

---

## 3. Logo System

### Primary Logo: Tradesy Wordmark
The Tradesy logo is a clean, bold wordmark with a subtle tool/trade mark integrated.

**Construction:**
- Wordmark: "Tradesy" in Inter Bold, Primary-600 blue
- A small wrench-and-shield icon sits to the left (or above on small screens)
- The shield represents trust/security; the tool mark represents tradeswork

**Clear Space:** Minimum of the height of the "T" on all sides.
**Minimum Size:** 120px wide (digital), 1.5in wide (print)

### Logo Variations
1. **Full Logo** — icon + wordmark (primary, for headers)
2. **Wordmark Only** — "Tradesy" text (for dense layouts)
3. **Icon Only** — shield/tool mark (favicon, app icon, avatar)
4. **White Version** — for dark backgrounds
5. **Small Version** — wordmark only, reduced size

### Incorrect Usage
- Do not change the logo colors
- Do not add effects (shadows, gradients, outlines)
- Do not rotate or skew
- Do not place on noisy backgrounds without sufficient contrast

---

## 4. Iconography

### Style: Outline + Duotone
- **Line weight:** 2px (regular), 1.5px (small)
- **Corner rounding:** Rounded (2px radius on square corners)
- **Color:** Primary-600 for active, Gray-500 for inactive, Amber-500 for featured
- **Size system:** 16px, 20px, 24px, 32px, 48px

### Category Icons (10 Trades)
| Category | Icon Concept |
|----------|-------------|
| Plumbing | Wrench + water drop |
| Electrical | Lightning bolt |
| Roofing | Roof peak with shingle |
| Landscaping | Leaf + shovel |
| Painting | Paint roller |
| HVAC | Fan/gear |
| Carpentry | Saw blade or hammer |
| Flooring | Floor plank/layout |
| Handyman | Cross wrench + screwdriver |
| Cleaning | Sparkle/broom |

### Trust Badge Icons
- **Verified** — Shield with checkmark (Success green)
- **Licensed** — Certificate/ribbon (Primary blue)
- **Insured** — Umbrella or shield (Primary blue)
- **Background Checked** — Magnifying glass + document (Primary blue)
- **Top Rated** — Star (Amber)
- **Pro Member** — Crown/certified (Primary blue)
- **Fast Responder** — Lightning bolt (Amber)

---

## 5. UI Components & Patterns

### Buttons
| Variant | Style | Usage |
|---------|-------|-------|
| **Primary** | Blue bg (#2563EB), white text, 8px radius | Main actions: "Get Started", "Sign Up" |
| **Accent** | Amber bg (#F59E0B), white text, 8px radius | Conversion: "Post a Job", "Bid Now" |
| **Secondary** | White bg, blue border (#2563EB), blue text | Secondary actions |
| **Ghost** | Transparent, blue text on hover | Tertiary/less important |
| **Success** | Green bg (#059669), white text | "Verify Now", "Approved" |
| **Danger** | Red bg (#DC2626), white text | "Remove", "Decline" |
| **Large** | 48px height, 16px horizontal padding, 16px font | Hero CTAs |
| **Default** | 40px height, 12px horizontal padding, 14px font | Standard buttons |
| **Small** | 32px height, 8px horizontal padding, 12px font | Compact buttons |

### Cards
- **Background:** White (#FFFFFF)
- **Radius:** 12px (large), 8px (small)
- **Shadow:** `0 1px 3px rgba(0,0,0,0.08)` (default), `0 4px 12px rgba(0,0,0,0.12)` (elevated)
- **Border:** 1px solid Gray-200
- **Padding:** 24px (large), 16px (small)

### Trust Indicators (Banners & Badges)
- Verified badge: Green shield + checkmark
- Each badge has a subtle 1px border and 4px radius
- Hover reveals a tooltip with verification details
- Contractor profiles show badge count prominently

### Forms
- Input height: 44px (touch-friendly)
- Border: 1.5px solid Gray-300
- Focus: 3px ring Primary-200
- Label: 14px Medium (500), Gray-700
- Helper text: 12px Regular, Gray-500
- Error: Red border + error icon + red helper text

---

## 6. Imagery Style

### Photography
- **Style:** Warm, natural, well-lit shots of real homes and tradespeople
- **Color temperature:** Slightly warm (amber-tinted) to feel inviting
- **Subjects:** Diverse homeowners and contractors, genuine interactions
- **Props:** Tools, blueprints, hard hats, tool belts (authentic trade items)
- **Avoid:** Stock-photo stiffness, overly staged scenes, cold blue lighting

### Illustrations
- **Style:** Flat vector with subtle gradients, rounded shapes
- **Colors:** Primary blue + accent amber on neutral backgrounds
- **Subjects:** House icons, tool icons, neighborhood maps, work-in-progress scenes
- **Use case:** Empty states, onboarding, feature highlights, category headers

### Hero Images
- Full-bleed, warm lifestyle imagery
- Overlay: Subtle gradient (dark bottom) for text readability
- CTA placement: Bottom-left or center on mobile
- Always include a clear value prop + single primary CTA

---

## 7. Spacing & Layout

### Grid System
- **Columns:** 12-column grid
- **Gutter:** 24px (desktop), 16px (tablet), 12px (mobile)
- **Max content width:** 1200px
- **Side margins:** 24px (desktop), 16px (tablet), 12px (mobile)

### Spacing Scale (Tailwind-compatible)
| Token | px | rem |
|-------|-----|------|
| `1` | 4px | 0.25rem |
| `2` | 8px | 0.5rem |
| `3` | 12px | 0.75rem |
| `4` | 16px | 1rem |
| `5` | 20px | 1.25rem |
| `6` | 24px | 1.5rem |
| `8` | 32px | 2rem |
| `10` | 40px | 2.5rem |
| `12` | 48px | 3rem |
| `16` | 64px | 4rem |
| `20` | 80px | 5rem |
| `24` | 96px | 6rem |

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `xs` | < 480px | Small phones |
| `sm` | ≥ 480px | Large phones |
| `md` | ≥ 768px | Tablets |
| `lg` | ≥ 1024px | Small desktops |
| `xl` | ≥ 1280px | Desktops |
| `2xl` | ≥ 1536px | Large desktops |

### Mobile-First Approach
- Design for `sm` first, enhance up
- Single column on mobile, 2 columns on tablet, 3-4 on desktop
- Job cards stack vertically on mobile, grid on desktop
- Navigation collapses to hamburger below `lg`

---

## 9. Voice & Tone

### Brand Voice
| Dimension | Style |
|-----------|-------|
| **Tone** | Warm, confident, helpful |
| **Formality** | Professional but not stiff |
| **Vocabulary** | Plain English, trade-friendly terms |
| **Person** | "You" (homeowner), "Your pro" (contractor) |
| **Active voice** | Always ("We connect you with top pros") |

### Key Messaging
| Audience | Message |
|----------|---------|
| **Homeowners** | "Get matched with trusted local pros for your home projects." |
| **Contractors** | "Stop chasing leads. Let the right jobs come to you." |
| **Value prop** | "Your home, our pros. Quality work, guaranteed." |
| **Trust** | "Every contractor is verified, licensed, and reviewed." |

### CTA Copy Guidelines
- **Primary CTAs:** Start with a verb — "Post Your Job", "Find a Pro", "Get Bids"
- **Secondary CTAs:** Benefit-oriented — "See How It Works", "View Reviews"
- **Avoid:** Generic "Submit", "Click Here", "Go"

---

## 10. Design Tokens (Tailwind Config Reference)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        accent: {
          50: '#FFFBEB',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '4px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08)',
        'card-elevated': '0 4px 12px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
}
```

---

## 11. Accessibility

- All color combinations meet WCAG AA contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text)
- Focus indicators: 3px ring using Primary-200 on all interactive elements
- Touch targets minimum 44x44px
- Alt text required on all images
- Semantic HTML hierarchy (h1 > h2 > h3)
- ARIA labels on icon-only buttons
- Skip-to-content link at top of page

---

*This style guide is a living document. Update as the brand evolves.*