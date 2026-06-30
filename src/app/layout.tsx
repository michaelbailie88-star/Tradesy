import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Tradesy — Your home, our pros",
  description:
    "Find trusted, verified local tradespeople for any home project. Post your job and get free bids from top-rated pros.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tradesy — Your home, our pros",
    description:
      "Find trusted, verified local tradespeople for any home project. Post your job and get free bids from top-rated pros.",
    type: "website",
    siteName: "Tradesy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}