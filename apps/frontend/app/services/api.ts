import axios from "axios";

export const formsMetaData = async () => {
  const response = await axios({
    method: "get",
    url: "/api/proxy/v1/form/",
  });
  return response.data;
};
