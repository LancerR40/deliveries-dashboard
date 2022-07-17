import axios from "axios";
import { CREATE_SHIPMENT_URL, GET_DRIVERS_SHIPMENTS_URL, GET_VEHICLES_SHIPMENTS_URL } from "./constants";

export const createShipmentAPI = async (data) => {
  try {
    const request = await axios.post(CREATE_SHIPMENT_URL, data)
    return request.data
  } catch (error) {
    return error
  }
}

export const getDriversAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(GET_DRIVERS_SHIPMENTS_URL, data);
    return request.data;
  } catch (error) {
    return error;
  }
};

export const getAssigmentsVehiclesAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(GET_VEHICLES_SHIPMENTS_URL, data);
    return request.data;
  } catch (error) {
    return error;
  }
};
