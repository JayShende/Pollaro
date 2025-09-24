import HeaderFormEdit from "@/app/pages/form-edit/components/header";
import { formInfoProps } from "@/app/types/form.types";
import { auth } from "@/auth";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import axios from "axios";
import { TabsProvider } from "@/app/pages/response/components/tabs-provider";
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ formId: string }>;
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
const Layout = async ({ children, params }: LayoutProps) => {
  const formId = (await params).formId;
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="bg-emerald-100 w-full h-10 flex items-center justify-center text-sm text-red-500">
        No active session
      </div>
    );
  }
  const cookieStore = await cookies();

  const response = await axios({
    method: "get",
    url: `http://localhost:3000/api/proxy/v1/form/info/${formId}`,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  });

  const info = response.data;
  const formInfo: formInfoProps = info.data;
  const { name, image, email } = session.user;
  if (name == null || name == undefined) {
    return;
  }
  if (email == null || email == undefined) {
    return;
  }
  if (image == null || image == undefined) {
    return;
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";
  if (initials == null || initials == undefined) {
    return;
  }
  return (
    <TabsProvider>
      <div className="w-full min-h-screen bg-gray-50">
        <HeaderFormEdit
          formId={formId}
          name={name}
          image={image}
          email={email}
          initials={initials}
          formInfo={formInfo}
        />
        <main className="flex-1 overflow-y-auto pb-4">{children}</main>
      </div>
    </TabsProvider>
  );
};

export default Layout;
