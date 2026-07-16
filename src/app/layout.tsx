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
  title: "Muhammad Hariz Fahmi | Software Engineer & Backend Developer",
  description: "Portfolio of Muhammad Hariz Fahmi Bin Mohamad Shahidi. Bachelor in Electronic Engineering Technology (Electronic Network Design). Worked on MIMOS CRM, MIMOS Academy Portal, and workflow automations.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Backend Developer", "MIMOS Academy", "UniMAP", "Malaysia", "Portfolio"],
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
