import DataHandler from "../handlers/DataHandler";
import axios from "axios";

const APIService = async ({ url, data = {}, method = "POST" }) => {
  const accessToken = DataHandler.getFromSession("accessToken");
  let headers = {
    "Content-Type": "application/json",
    "Cache-Control": "No-Cache",
  };

  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }

  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      baseURL: process.env.REACT_APP_API,
      data,
      headers,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
        else resolve(res);
      })
      .catch((error) => {
        if (error.response) {
          if ([401, 410].includes(error?.response?.status)) {
            window.location.replace("/login");
          }
          reject(error.response.data.error);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error);
        }
      });
  });
};

export default APIService;
