import { useMutation } from "@tanstack/react-query";
import { responseProps } from "../types/form.types";
import { addReponse } from "./api";

export function useAddResponse() {
  return useMutation({
    mutationFn: (data: responseProps) => addReponse(data),
    mutationKey: ["add_response"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSuccess: () => {
      console.log("Successfull");
    },
  });
}
