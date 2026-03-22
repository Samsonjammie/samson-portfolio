import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Joseph Samson | UI/UX Designer",
  description: "Crafting meaningful digital experiences with UI/UX design, branding, and interactive interfaces.",

  openGraph: {
    title: "Joseph Samson | UI/UX Designer",
    description: "Explore my portfolio – UI/UX, web design, branding, and creative projects.",
    url: "https://samson-designer-portfolio.vercel.app/",
    siteName: "Joseph Portfolio",
    images: [
      {
        url: "https://samson-designer-portfolio.vercel.app/apple-icon2.png", // IMPORTANT
        width: 1200,
        height: 630,
        alt: "Joseph Samson Portfolio",
      },
    ],
    type: "website",
  },
  metadataBase: new URL("https://samson-designer-portfolio.vercel.app/"),

  twitter: {
    card: "summary_large_image",
    title: "Joseph Samson | UI/UX Designer",
    description: "Explore my portfolio – UI/UX, web design, branding, and creative projects.",
    images: ["/apple-icon2.png"],
  },
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
