"use client";
import EditFormPage from "@/app/pages/form-edit";
import { useParams } from "next/navigation";
import FormHeaderCard from "@/app/pages/form-edit/components/ui/form-header";
import { useGetFormInfo } from "@/app/services/queries";

const FormEdit = () => {
  const params = useParams();
  const formId = params.formId?.toString();
  if (!formId) {
    return <div>Form Id is not provided</div>;
  }
  
  return (
   <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6">
   <FormHeaderCard formId={formId as string} />
   <EditFormPage/>
   <div>Edit </div>
   </div>
  )
};

export default FormEdit;
