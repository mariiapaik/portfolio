import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE = "https://mariiapaik.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Mariia Paik — Full-Stack & AI Engineer",
  description:
    "Full-Stack Engineer building AI-powered backend systems. Node.js · NestJS · React · Python. Shipped autonomous LLM agents used by 200+ media buyers serving brands like Pepsi & Starbucks.",
  authors: [{ name: "Mariia Paik" }],
  openGraph: {
    title: "Mariia Paik — Full-Stack & AI Engineer",
    description:
      "Full-Stack Engineer building AI-powered backend systems. Node.js · NestJS · React · Python.",
    url: SITE,
    siteName: "Mariia Paik",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <div className="grid-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}
