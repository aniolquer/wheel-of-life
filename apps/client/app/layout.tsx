import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wheel of Life",
  description: "Assess your life",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen`}
      >
        <div className="container mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
