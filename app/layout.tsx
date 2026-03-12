import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Joseph Samson | UI/UX Designer & Graphic Artist",
  description:
    "Portfolio of Joseph Samson featuring UI/UX design, branding, motion, and digital product case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050505]">
      <body className={`${inter.variable} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
