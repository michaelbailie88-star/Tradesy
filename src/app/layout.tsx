import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Vettd — Your home, our pros",
  description:
    "Find trusted, verified local tradespeople for any home project. Post your job and get free bids from top-rated pros.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Vettd — Your home, our pros",
    description:
      "Find trusted, verified local tradespeople for any home project. Post your job and get free bids from top-rated pros.",
    type: "website",
    siteName: "Vettd",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F5F0]">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}