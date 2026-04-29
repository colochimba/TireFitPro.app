import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tire Size Calculator & Fitment Tool | TireFitPro",
  description:
    "Compare tire sizes, calculate diameter, speedometer error, and see if your new tires will fit your vehicle.",
  keywords: [
    "tire size calculator",
    "tire comparison",
    "tire fitment",
    "wheel size calculator",
  ],
  authors: [{ name: "TireFitPro" }],
  creator: "TireFitPro",
  publisher: "TireFitPro",
  metadataBase: new URL("https://tirefitpro.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tirefitpro.app",
    title: "Tire Size Calculator & Fitment Tool | TireFitPro",
    description:
      "Compare tire sizes, calculate diameter, speedometer error, and see if your new tires will fit your vehicle.",
    siteName: "TireFitPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tire Size Calculator & Fitment Tool | TireFitPro",
    description:
      "Compare tire sizes, calculate diameter, speedometer error, and see if your new tires will fit your vehicle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-8257580371633170",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8257580371633170"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-[#0F172A] antialiased">
        <header className="border-b border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="TireFitPro Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </a>
            <nav className="flex items-center gap-1">
              <a
                href="/"
                className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
              >
                Calculator
              </a>
              <a
                href="/blog"
                className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
              >
                Blog
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[#1E293B] mt-20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <img
                src="/logo.png"
                alt="TireFitPro Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} TireFitPro. Free tire size calculator and fitment tool.
            </p>
            <p className="text-slate-600 text-xs mt-2">
              Results are approximate and for reference only. Always consult a professional before modifying your vehicle.
            </p>
          </div>
        </footer>
        <GoogleAnalytics gaId="G-84BMP9GRF0" />
      </body>
    </html>
  );
}
