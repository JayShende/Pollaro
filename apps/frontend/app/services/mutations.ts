import { useMutation } from "@tanstack/react-query";
import { createFormProps, responseProps } from "../types/form.types";
import { addReponse, checkOwner, createForm, deleteFile } from "./api";

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

export function useCreateForm() {
  return useMutation({
    mutationFn: (data: createFormProps) => createForm(data),
    mutationKey: ["create_form"],
  });
}
export function useCheckOwner() {
  return useMutation({
    mutationFn: (formId: string) => checkOwner(formId),
    mutationKey: ["check_owner"],
  });
}
