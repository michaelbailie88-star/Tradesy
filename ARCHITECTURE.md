# Tradesy Marketplace Architecture

## Tech Stack
- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Production) / SQLite (Development)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **State Management:** React Context / Server Actions
- **Icons:** Lucide React

## Folder Structure
- `src/app/`: File-based routing, layouts, and pages.
- `src/components/`: Reusable React components.
  - `ui/`: Shared UI components (Buttons, Inputs, etc.).
  - `layout/`: Global layout components (Header, Footer).
  - `product/`: Product-related components (Listing cards, Details).
  - `seller/`: Seller dashboard components.
- `src/lib/`: Shared utility functions and database clients.
- `src/hooks/`: Custom React hooks.
- `src/services/`: Business logic and data access layer.
- `src/types/`: Shared TypeScript interfaces and types.
- `prisma/`: Database schema and migration files.

## Database Schema
- **User:** ID, Name, Email, Password, Role (BUYER, SELLER, ADMIN), Stripe Account ID.
- **Product:** ID, Name, Description, Price, Brand, Size, Category, Condition, Seller, Orders, Listing (link).
- **Listing:** ID, IsActive, Featured, Views, Product ID (link), Seller ID.
- **Image:** ID, URL, Product ID.
- **Order:** ID, Buyer, Seller, Product, Amount, Commission, Status (PENDING, PAID, SHIPPED, etc.), Stripe Session ID.
- **Category:** ID, Name, Slug.
- **Review:** ID, Rating, Comment, Reviewer, Reviewee, Order.

## Authentication Flow
1. Users sign up/in using email/password or OAuth (Google/Apple).
2. JWT-based sessions managed by NextAuth.js.
3. Protected routes handled via Next.js Middleware or Server Component checks.

## Key Features
- **Storefront:** Browsing products by category, brand, size, and search.
- **Seller Dashboard:** List items, manage inventory (isActive, featured), view sales and views.
- **Checkout:** Integrated with Stripe for secure payments and commission tracking.
- **Authentication:** Secure sign-up/sign-in for buyers and sellers.
- **Reviews:** Peer-to-peer feedback system for completed transactions.
