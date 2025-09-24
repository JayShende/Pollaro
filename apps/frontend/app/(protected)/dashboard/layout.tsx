import HeaderBar from "@/components/header-bar";
import { Metadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}


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
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <HeaderBar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
