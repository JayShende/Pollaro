import { useQuery } from "@tanstack/react-query";
import {
  checkIfFormIsAcceptingResponses,
  checkOwner,
  formsMetaData,
  getForm,
  getFormInfo,
  getFormQuestions,
} from "./api";

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

export function useGetFormInfo(formId: string) {
  return useQuery({
    queryKey: ["form_info", formId],
    queryFn: () => getFormInfo(formId),
    refetchOnWindowFocus: false,
  });
}

//  query to get the questions of a form
export function useGetFormQuestions(formId: string) {
  return useQuery({
    queryKey: ["form_questions", formId],
    queryFn: () => getFormQuestions(formId),
    refetchOnWindowFocus: false,
  });
}

// query to check if the form is accepting responses
export function useCheckIfFormIsAcceptingResponses(formId: string) {
  return useQuery({
    queryKey: ["form_accepting_responses", formId],
    queryFn: () => checkIfFormIsAcceptingResponses(formId),
    refetchOnWindowFocus: false,
  });
}


// query to check if the user is the owner of the form
export function useCheckOwner(formId: string) {
  return useQuery({
    queryKey: ["check_owner", formId],
    queryFn: () => checkOwner(formId),
    refetchOnWindowFocus: false,
  });
}