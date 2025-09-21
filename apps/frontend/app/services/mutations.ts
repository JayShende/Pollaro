import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFormProps, responseProps } from "../types/form.types";
import {
  addLongAnswer,
  addMultipleChoice,
  addCheckbox,
  addDropdown,
  addFileUpload,
  addReponse,
  addShortAnswer,
  checkOwner,
  createForm,
  deleteFile,
  updateFormInfo,
  toggleAcceptingResponses,
  deleteQuestion,
} from "./api";
import {
  addLongAnswerProps,
  addMultipleChoiceProps,
  addShortAnswerProps,
  addCheckboxProps,
  addDropdownProps,
  addFileUploadProps,
} from "../types/questions.types";

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
export function useCheckOwner2() {
  return useMutation({
    mutationFn: (formId: string) => checkOwner(formId),
    mutationKey: ["check_owner"],
  });
}

interface updateFormInfoProps {
  formId: string;
  data: createFormProps;
}

export function useUpdateFormInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formId, data }: updateFormInfoProps) =>
      updateFormInfo(formId, data),
    mutationKey: ["update_form_info"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSuccess: () => {
      console.log("Successfull");
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_info", variables.formId],
      });
    },
  });
}

//  add Question Mutation

export function useAddShortAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addShortAnswerProps) => addShortAnswer(data),
    mutationKey: ["add_short_answer"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

export function useAddLongAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addLongAnswerProps) => addLongAnswer(data),
    mutationKey: ["add_long_answer"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

export function useAddMultipleChoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addMultipleChoiceProps) => addMultipleChoice(data),
    mutationKey: ["add_multiple_choice"],
    onMutate: () => {
      console.log("Mutatted");
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

export function useAddCheckbox() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addCheckboxProps) => addCheckbox(data),
    mutationKey: ["add_checkbox"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

export function useAddDropdown() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addDropdownProps) => addDropdown(data),
    mutationKey: ["add_dropdown"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

export function useAddFileUpload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addFileUploadProps) => addFileUpload(data),
    mutationKey: ["add_file_upload"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

interface deleteQuestionProps {
  formId: string;
  questionId: string;
}

// delete question mutation
export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formId, questionId }: deleteQuestionProps) =>
      deleteQuestion(formId, questionId),
    mutationKey: ["delete_question"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_questions", variables.formId],
      });
    },
  });
}

// toggle accepting responses mutation

export function useToggleAcceptingResponses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formId: string) => toggleAcceptingResponses(formId),
    mutationKey: ["toggle_accepting_responses"],
    onMutate: () => {
      console.log("Mutatted");
    },
    onSettled: async (_, error, formId) => {
      if (error) {
        console.log(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["form_accepting_responses", formId],
      });
    },
  });
}
