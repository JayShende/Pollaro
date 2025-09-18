"use client";

import { useGetFormMetaData } from "@/app/services/queries";
import FormCard from "./components/ui/form-card";
import CreateNewFormCard from "./components/ui/new-form-card";
import { formMetaData } from "@/app/types/form.types";

const DashboardMain = () => {
  const getFormMetaData = useGetFormMetaData();
  if (getFormMetaData.isPending) {
    return <div>Loading........</div>;
  }
  if (getFormMetaData.isError) {
    return <div>Some Error</div>;
  }
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-6 gap-x-4 gap-y-6">
        <CreateNewFormCard />
        {getFormMetaData.data.data.map((form: formMetaData) => (
          <FormCard
            key={form.id}
            formId={form.id}
            title={form.title}
            description={form.description}
            updatedAt={form.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardMain;
