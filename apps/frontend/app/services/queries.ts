import { useQuery } from "@tanstack/react-query";
import { formsMetaData } from "./api";

export function useGetFormMetaData() {
  return useQuery({
    queryKey: ["form_metaData"],
    queryFn: formsMetaData,
    refetchOnWindowFocus: false,
  });
}
