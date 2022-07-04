import axios from "axios";
import { DRIVERS_BY_QUERIES_URL, DRIVERS_DOCUMENTS, CREATE_DRIVER_URL } from "./constants";

export const driversByQueriesAPI = async (data) => {
  try {
    const request = await axios.post(DRIVERS_BY_QUERIES_URL, data);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const driversDocumentsAPI = async () => {
  try {
    const request = await axios.get(DRIVERS_DOCUMENTS);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const createDriverAPI = async (data) => {
  try {
    const request = await axios.post(CREATE_DRIVER_URL, data);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const createDriverDocumentAPI = async (data) => {
  try {
    const request = await axios.post(DRIVERS_DOCUMENTS, data);

    return request.data;
  } catch (error) {
    return error;
  }
};
