import axios from "axios";
import { DRIVERS_BY_QUERIES_URL, DRIVERS_DOCUMENTS, CREATE_DRIVER_URL } from "./constants";

export const driversByQueriesAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(DRIVERS_BY_QUERIES_URL, data, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const driversDocumentsAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(DRIVERS_DOCUMENTS, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const createDriverAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(CREATE_DRIVER_URL, data, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const createDriverDocumentAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(DRIVERS_DOCUMENTS, data, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};
