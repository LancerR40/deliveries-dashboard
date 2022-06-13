import axios from "axios";
import { DRIVERS_BY_QUERIES_URL, CREATE_DRIVER_URL, ADD_DRIVER_DOCUMENT_URL } from "./constants";

export const driversByQueriesAPI = async (data) => {
  try {
    const request = await axios.post(DRIVERS_BY_QUERIES_URL, data);

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

export const addDriverDocumentAPI = async (data) => {
  try {
    const request = await axios.post(ADD_DRIVER_DOCUMENT_URL, data);

    return request.data;
  } catch (error) {
    return error;
  }
};
