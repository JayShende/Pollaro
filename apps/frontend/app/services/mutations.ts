import { useMutation } from "@tanstack/react-query";
import { responseProps } from "../types/form.types";
import { addReponse, deleteFile } from "./api";

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

export function useDeleteFile() {
  return useMutation({
    mutationFn: (key: string) => deleteFile(key),
    mutationKey: ["delete_file"],
    onMutate: () => {
      console.log("Mutatted");
    },
  });
}
