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
  title: "Muhammad Hariz Fahmi | Full-Stack Developer",
  description: "Full-Stack Developer specializing in PHP, MySQL, JavaScript, backend development, workflow automation, and business web applications.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Backend Developer",
    "Automation Engineer",
    "PHP",
    "MySQL",
    "JavaScript",
    "Google Apps Script",
    "REST API",
    "MIMOS Academy",
    "Portfolio"
  ],
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
