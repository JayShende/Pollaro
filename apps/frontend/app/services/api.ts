import axios from "axios";
import { responseProps } from "../types/form.types";
const baseUrl = "api/proxy/v1";

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
