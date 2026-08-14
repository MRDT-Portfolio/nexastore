import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/NavBar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nexastore.vercel.app'),

  title: {
    default: 'NexaStore | Modern Online Store',
    template: '%s | NexaStore',
  },

  description:
    'Discover quality products at NexaStore. Shop our collection of products with fast shipping and a seamless shopping experience.',

  keywords: [
    'NexaStore',
    'online store',
    'ecommerce',
    'shop online',
    'online shopping',
  ],

  authors: [
    {
      name: 'NexaStore',
    },
  ],

  creator: 'NexaStore',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NexaStore',
    title: 'NexaStore | Modern Online Store',
    description:
      'Discover quality products at NexaStore.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'NexaStore | Modern Online Store',
    description:
      'Discover quality products at NexaStore.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
         <body className="min-h-screen bg-white text-neutral-950">
        <Providers>
          <AnnouncementBar />
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
          <CartDrawer/>
        </Providers>
      </body>
    </html>
  );
}
