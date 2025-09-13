import axios from "axios";
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
