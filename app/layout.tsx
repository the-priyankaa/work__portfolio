import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/anton/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suman — Graphic Designer, Animator & Video Editor",
  description:
    "Portfolio of Suman: brand design, animation, product showcases and photo retouching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
