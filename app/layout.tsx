import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./lib/definitions/models";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KitchenDex",
  description: "Your ERP System for groceries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
