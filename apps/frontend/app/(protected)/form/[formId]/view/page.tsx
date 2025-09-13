"use client";
import ViewForm from "@/app/pages/form-view";
import { useParams } from "next/navigation";

const ViewFormMain = () => {
  const params = useParams();
  const formId = params.formId?.toString();
  if (!formId) {
    return <div>Form Id is not provided</div>;
  }

  return (
    <div className="px-80 py-5">
      <ViewForm formId={formId} />
    </div>
  );
};

export default ViewFormMain;
