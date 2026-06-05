import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pembayaran - Yanuar Ardhika",
  description: "Halaman pembayaran resmi Yanuar Ardhika. Mendukung QRIS dan Transfer Bank Mandiri.",
  keywords: ["Pembayaran", "QRIS", "Transfer Bank", "Yanuar Ardhika"],
  openGraph: {
    title: "Pembayaran - Yanuar Ardhika",
    description: "Selesaikan transaksi Anda dengan mudah melalui QRIS atau Transfer Bank.",
    url: "https://pay-sekarang.vercel.app",
    siteName: "Payment Yanuar Ardhika",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
