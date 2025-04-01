import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Upwork Profile Analyzer | Optimize Your Freelancer Profile",
    template: "%s | Upwork Profile Analyzer"
  },
  description: "Analyze and optimize your Upwork profile for better visibility and success. Get detailed insights and recommendations to improve your freelancer profile.",
  keywords: "upwork profile analyzer, freelancer profile optimization, upwork profile tips, freelancer success, upwork profile optimization",
  authors: [{ name: "Upwork Profile Analyzer" }],
  openGraph: {
    title: "Upwork Profile Analyzer | Optimize Your Freelancer Profile",
    description: "Analyze and optimize your Upwork profile for better visibility and success. Get detailed insights and recommendations to improve your freelancer profile.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upwork Profile Analyzer | Optimize Your Freelancer Profile",
    description: "Analyze and optimize your Upwork profile for better visibility and success. Get detailed insights and recommendations to improve your freelancer profile.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
