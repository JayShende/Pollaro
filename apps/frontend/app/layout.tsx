import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TanstackProvider } from "@/components/providers/tasnstack-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Pollaro",
  description: "Build Forms & Polls That People Love to Answer",
  openGraph: {
    images: [
      {
        url: "https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png",
        width: 800,
        height: 600,
        alt: "Pollaro",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        rel: "icon",
        type:"image/x-icon",
        sizes: "32x32", // optional but good
      },
    ],
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanstackProvider>
          <main className="">{children}</main>
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
