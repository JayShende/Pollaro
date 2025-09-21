"use client";

import { useParams } from "next/navigation";
import FormHeaderCard from "@/app/pages/form-edit/components/ui/form-header";
import AddQuestion from "@/app/pages/form-edit/components/ui/add-question";
import QuestionsCards from "@/app/pages/form-edit/components/question-cards";
import { useCheckOwner } from "@/app/services/queries";

const FormEdit = () => {
  const params = useParams();
  const formId = params.formId?.toString();
  const checkFormOwnerQuery = useCheckOwner(formId as string);

  if (!formId) {
    return <div>Form Id is not provided</div>;
  }
  if (checkFormOwnerQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (checkFormOwnerQuery.isError) {
    return <div>Error...</div>;
  }
  const isOwner = checkFormOwnerQuery.data.data;
  if (!isOwner) {
    return <div>You are not the owner of the form</div>;
  }
  return (
    <div className="flex flex-col gap-y-6 max-w-4xl mx-auto p-6">
      <FormHeaderCard formId={formId as string} />
      <QuestionsCards formId={formId as string} />
      <AddQuestion formId={formId as string} />
    </div>
  );
};

export default FormEdit;
