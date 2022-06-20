import axios from "axios";
import { VEHICLE_BRANDS_URL, VEHICLE_BY_QUERIES_URL } from "./constants";

export const getBrandsAPI = async () => {
  try {
    const request = await axios.get(VEHICLE_BRANDS_URL);

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
