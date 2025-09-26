import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alevines - Calculadora de Estanques",
  description: "Sistema para calcular costos y rentabilidad de estanques para peces",
  generator: "v0.app",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
          <Suspense>{children}</Suspense>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
