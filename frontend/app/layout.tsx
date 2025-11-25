import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/provider";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecurChain - Autonomous Payment Automation",
  description:
    "Recurring payments powered by USDC on Base. Automate your finances with precision.",
  icons: {
    icon: "/recurchain_logo.png",
    apple: "/recurchain_logo.png",
  },
};

// Wrap client-side providers inside a separate component
function ClientProviders({ children }: { children: React.ReactNode }) {
  'use client';
  return (
    <Providers>
      {children}
      <Analytics />
    </Providers>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
