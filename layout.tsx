import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades Platform",
  description: "Connecting homeowners and businesses with trusted contractors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
