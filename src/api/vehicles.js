import axios from "axios";
import { VEHICLE_BRANDS_URL } from "./constants";

export const getBrandsAPI = async () => {
  try {
    const request = await axios.get(VEHICLE_BRANDS_URL);

    return request.data;
  } catch (error) {
    return error;
  }
};
