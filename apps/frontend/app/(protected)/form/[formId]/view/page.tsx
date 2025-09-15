"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewForm from "@/app/pages/form-view";
import AlreadyResponded from "@/app/pages/form-view/already-reponded";

const ViewFormMain = () => {
  const params = useParams();
  const formId = params.formId?.toString();

  const [hasResponded, setHasResponded] = useState<boolean | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("hasResponded");
    setHasResponded(value === "true");
  }, []);

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
