"use client";
import EditFormPage from "@/app/pages/form-edit";
import { useParams } from "next/navigation";

const FormEdit = () => {
  const params = useParams();
  const formId = params.formId?.toString();
  if (!formId) {
    return <div>Form Id is not provided</div>;
  }
  return (
   <>
   <EditFormPage/>
   <div>Edit </div>
   </>
  )
};

export default FormEdit;
