import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { portfolio } from "@/data/portfolio";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolio.name} — ${portfolio.role}`,
  description: portfolio.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}
    >
      <body className="bg-navy text-cream antialiased">
        {/* MotionConfig makes every motion component honour
            prefers-reduced-motion without hydration mismatches. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <CustomCursor />
      </body>
    </html>
  );
}