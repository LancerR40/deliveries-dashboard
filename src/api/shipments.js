import axios from "axios";
import { CREATE_SHIPMENT_URL, GET_ALL_SHIPMENT_TRACKING_COORDINATES, GET_DRIVERS_SHIPMENTS_URL, GET_VEHICLES_SHIPMENTS_URL, GET_ACTIVE_SHIPMENT_DRIVERS,GET_DRIVER_SHIPMENT_COORDINATES } from "./constants";

export const createShipmentAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(CREATE_SHIPMENT_URL, data, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return error
  }
}

export const getDriversAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(GET_DRIVERS_SHIPMENTS_URL, data, { headers: { "x-authorization-token": token } });
    return request.data;
  } catch (error) {
    return error;
  }
};

export const getAssigmentsVehiclesAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(GET_VEHICLES_SHIPMENTS_URL, data, { headers: { "x-authorization-token": token } });
    return request.data;
  } catch (error) {
    return error;
  }
};

export const getActiveShipmentDriversAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(GET_ACTIVE_SHIPMENT_DRIVERS, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return error
  }
}

export const getShipmentTrackingCoordinatesAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(GET_DRIVER_SHIPMENT_COORDINATES, data, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return error
  }
}

export const getAllShipmentTrackingCoordinatesAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(GET_ALL_SHIPMENT_TRACKING_COORDINATES, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return error
  }
}