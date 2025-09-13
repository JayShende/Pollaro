import { useGetForm } from "@/app/services/queries";
import { formProps } from "@/app/types/form.types";
import FormHeaderCard from "./components/ui/form-header-card";

interface ViewFormProps {
  formId: string;
}

const ViewForm = ({ formId }: ViewFormProps) => {
  const getForm = useGetForm(formId);
  if (getForm.isPending) {
    return <div>Loading.....</div>;
  }
  if (getForm.isError) {
    return <div>Some Error</div>;
  }
  const dataObject: formProps = getForm.data;
  const headerCardData = {
    formId: dataObject.data.id,
    title: dataObject.data.title,
    description: dataObject.data.description,
    ownerName:dataObject.data.owner.name,
    ownerEmail:dataObject.data.owner.email,
    createdAt:dataObject.data.createdAt
  };
  return (
    <div>
      {/* <div className="bg-emerald-200">Inside Form View</div>
      <div>{formId}</div> */}
      <FormHeaderCard data={headerCardData}  />
    </div>
  );
};

export default ViewForm;
