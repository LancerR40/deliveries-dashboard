import axios from "axios";
import { VEHICLE_DOCUMENTS, VEHICLE_BRANDS_URL, VEHICLE_BY_QUERIES_URL, CREATE_VEHICLE_URL } from "./constants";

export const createVehicleAPI = async (data) => {
  try {
    const request = await axios.post(CREATE_VEHICLE_URL, data);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const getBrandsAPI = async () => {
  try {
    const request = await axios.get(VEHICLE_BRANDS_URL);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const vehicleDocumentsAPI = async () => {
  try {
    const request = await axios.get(VEHICLE_DOCUMENTS);

    return request.data;
  } catch (error) {
    return error;
  }
};

export const getVehiclesAPI = async (payload) => {
  try {
    const request = await axios.post(VEHICLE_BY_QUERIES_URL, payload);

    return request.data;
  } catch (error) {
    return error;
  }
};
