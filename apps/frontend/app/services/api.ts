import axios from "axios";
import { createFormProps, responseProps } from "../types/form.types";
import {
  addLongAnswerProps,
  addMultipleChoiceProps,
  addShortAnswerProps,
  addCheckboxProps,
  addDropdownProps,
  addFileUploadProps,
} from "../types/questions.types";
export const baseUrl = "api/proxy/v1";

export const formsMetaData = async () => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/`,
  });
  return response.data;
};

export const getForm = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/getForm/${formId}`,
  });
  return response.data;
};

export const addReponse = async (data: responseProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/response/addResponse`,
    data: data,
  });
  return response.data;
};

export const deleteFile = async (key: string) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/file/delete`,
    data: { key },
  });
  return response.data;
};

export const createForm = async (data: createFormProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/form/createForm`,
    data: data,
  });
  return response.data;
};

export const getFormInfo = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/info/${formId}`,
  });

  return response.data;
};
export const checkOwner = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/checkOwner/${formId}`,
  });
  return response.data;
};

export const updateFormInfo = async (formId: string, data: createFormProps) => {
  const response = await axios({
    method: "put",
    url: `/${baseUrl}/form/info/${formId}`,
    data: data,
  });
  return response.data;
};

//  add Question API

export const addShortAnswer = async (data: addShortAnswerProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addShortAnswer`,
    data: data,
  });
  return response.data;
};

export const addLongAnswer = async (data: addLongAnswerProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addLongAnswer`,
    data: data,
  });
  return response.data;
};

export const addMultipleChoice = async (data: addMultipleChoiceProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addMultipleChoice`,
    data: data,
  });
  return response.data;
};

export const addCheckbox = async (data: addCheckboxProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addCheckbox`,
    data: data,
  });
  return response.data;
};

export const addDropdown = async (data: addDropdownProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addDropdown`,
    data: data,
  });
  return response.data;
};

export const addFileUpload = async (data: addFileUploadProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addFileUpload`,
    data: data,
  });
  return response.data;
};

//  api to get the questions of a form
export const getFormQuestions = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/questions/${formId}`,
  });
  return response.data;
};

// check if the form is accepting responses
export const checkIfFormIsAcceptingResponses = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/checkIfFormIsAcceptingResponses/${formId}`,
  });
  return response.data;
};

// toggle accepting responses api
export const toggleAcceptingResponses = async (formId: string) => {
  const response = await axios({
    method: "put",
    url: `/${baseUrl}/form/updateAcceptingResponses`,
    data: { formId },
  });
  return response.data;
};

// Delete Question API
export const deleteQuestion = async (formId: string, questionId: string) => {
  const response = await axios({
    method: "delete",
    url: `/${baseUrl}/question/delete/${formId}/${questionId}`,
  });
  return response.data;
};

// fetch all responses of a form
export const getTotalResponses = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/response/getTotalResponses/${formId}`,
  });
  return response.data;
};