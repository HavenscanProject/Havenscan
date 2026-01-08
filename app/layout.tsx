import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "HavenScan | Continuous Home Health Monitoring",
  description:
    "Detect hidden risks before they become costly or dangerous. A unified system for continuous home health monitoring.",
  icons: {
    icon: "/HavenScanLogo.png",
    shortcut: "/HavenScanLogo.png",
    apple: "/HavenScanLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
                <Image 
                  src="/HavenScanLogo.png" 
                  alt="HavenScan Logo" 
                  width={32} 
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span>HavenScan</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  About
                </Link>
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main> 
      </body>
    </html>
  );
}