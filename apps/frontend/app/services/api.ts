import axios from "axios";
import { createFormProps, responseProps } from "../types/form.types";
import { addLongAnswerProps, addShortAnswerProps } from "../types/questions.types";
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

export const addShortAnswer = async (data:addShortAnswerProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addShortAnswer`,
    data: data,
  });
  return response.data;
}

export const addLongAnswer = async (data:addLongAnswerProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/question/addLongAnswer`,
    data: data,
  });
  return response.data;
}

//  api to get the questions of a form
export const getFormQuestions = async (formId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/form/questions/${formId}`,
  });
  return response.data;
};