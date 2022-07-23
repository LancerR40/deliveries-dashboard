import axios from "axios";
import { VEHICLE_DOCUMENTS, VEHICLE_BRANDS_URL, VEHICLE_BY_QUERIES_URL, CREATE_VEHICLE_URL, CREATE_VEHICLE_ASSIGNMENT_URL, ASSIGNMENT_VEHICLES_URL } from "./constants";

export const createVehicleAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(CREATE_VEHICLE_URL, data, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const createVehicleAssignmentAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(CREATE_VEHICLE_ASSIGNMENT_URL, data, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const deleteAssignmentAPI = async (data) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.delete(ASSIGNMENT_VEHICLES_URL + `/${data}`, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return error
  }
}

export const getBrandsAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(VEHICLE_BRANDS_URL, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const getVehicleDocumentsAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(VEHICLE_DOCUMENTS, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const getVehiclesAPI = async (payload) => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.post(VEHICLE_BY_QUERIES_URL, payload, { headers: { "x-authorization-token": token } });

    return request.data;
  } catch (error) {
    return error;
  }
};

export const getAssignmentsAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(ASSIGNMENT_VEHICLES_URL, { headers: { "x-authorization-token": token } })
    return request.data
  } catch (error) {
    return false
  }
}
