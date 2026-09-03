import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Hariz Fahmi | Software & Network Engineer Portfolio",
  description: "Software & Network Engineer with production experience at MIMOS Academy. Built enterprise CRM systems, training portals, IoT prototypes, and workflow automation pipelines. Electronic Engineering graduate from UniMAP.",
  keywords: ["Software Engineer", "Network Engineer", "Full-Stack Developer", "PHP", "MySQL", "IoT", "MIMOS Academy", "UniMAP", "Malaysia", "Portfolio", "Cisco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} font-sans min-h-full text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
