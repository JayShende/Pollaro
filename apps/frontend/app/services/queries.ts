import { useQuery } from "@tanstack/react-query";
import { formsMetaData, getForm } from "./api";

export function useGetFormMetaData() {
  return useQuery({
    queryKey: ["form_metaData"],
    queryFn: formsMetaData,
    refetchOnWindowFocus: false,
  });
}

export function useGetForm(formId: string) {
  return useQuery({
    queryKey: ["entire_form", formId],
    queryFn: () => getForm(formId),
    refetchOnWindowFocus: false,
  });
}
