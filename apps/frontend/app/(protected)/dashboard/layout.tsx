import HeaderBar from "@/components/header-bar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen bg-white">
      <HeaderBar />
      <main >{children}</main>
    </div>
  );
};

export default Layout;
