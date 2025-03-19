import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Euro Dong",
  description: "Convert between Vietnamese Dong (VND) and Euro (EUR) with our stylish Vietnam-inspired currency converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed inset-0 -z-10">
          {/* Main background - subtle red pattern */}
          <div className="absolute inset-0 bg-[#da251d] opacity-[0.03]"></div>
          
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.3] animate-spin-slow">
            <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
          </div>
          
          <div className="absolute top-0 left-0 w-48 h-48 opacity-[0.07]">
            <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
          </div>
          
          {/* Red banner at top */}
          <div className="absolute top-0 left-0 right-0 h-2 vn-red-gradient"></div>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
