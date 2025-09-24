"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewForm from "@/app/pages/form-view";
import AlreadyResponded from "@/app/pages/form-view/already-reponded";
import { useCheckIfFormIsAcceptingResponses } from "@/app/services/queries";
import { Metadata } from 'next';


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
    icon: "https://d2umaa5a4grwi8.cloudfront.net/projects/pollaro/assets/logo_2.png",
  },
};

const ViewFormMain = () => {
  const params = useParams();
  const formId = params.formId?.toString();
  const isAcceptingResponsesQuery = useCheckIfFormIsAcceptingResponses(
    formId as string
  );
  const [hasResponded, setHasResponded] = useState<boolean | null>(null);
  useEffect(() => {
    const value = localStorage.getItem("hasResponded");
    setHasResponded(value === "true");
  }, []);

  if (isAcceptingResponsesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (isAcceptingResponsesQuery.isError) {
    return <div>Error...</div>;
  }
  const isAcceptingResponses = isAcceptingResponsesQuery.data.data;
  if (!isAcceptingResponses) {
    return <div>Form is not accepting responses</div>;
  }

  if (!formId) {
    return <div>Form Id is not provided</div>;
  }

  // While checking localStorage (first render), show nothing or a loader
  if (hasResponded === null) {
    return <div>Loading...</div>;
  }

  if (hasResponded) {
    return <AlreadyResponded />;
  }

  return <ViewForm formId={formId} />;
};

export default ViewFormMain;
