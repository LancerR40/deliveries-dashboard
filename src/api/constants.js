const BASE_URL = "http://localhost:4000/api/v1";

export const USER_DATA = `${BASE_URL}/admins/data`;

export const CHECK_SESSION_URL = `${BASE_URL}/auth/admins/session`;
export const LOGIN_URL = `${BASE_URL}/auth/admins/login`;

export const DRIVERS_BY_QUERIES_URL = `${BASE_URL}/drivers`;
export const DRIVERS_DOCUMENTS = `${BASE_URL}/drivers/documents`;
export const CREATE_DRIVER_URL = `${BASE_URL}/drivers/create`;
// export const ADD_DRIVER_DOCUMENT_URL = `${BASE_URL}/drivers/document`;

export const VEHICLE_DOCUMENTS = `${BASE_URL}/vehicles/documents`;
export const VEHICLE_BRANDS_URL = `${BASE_URL}/vehicles/brands`;
export const VEHICLE_BY_QUERIES_URL = `${BASE_URL}/vehicles`;
export const CREATE_VEHICLE_URL = `${BASE_URL}/vehicles/create`;
export const CREATE_VEHICLE_ASSIGNMENT_URL = `${BASE_URL}/vehicles/assignment`;

export const CREATE_SHIPMENT_URL = `${BASE_URL}/shipments`
export const GET_DRIVERS_SHIPMENTS_URL = `${BASE_URL}/shipments/drivers`;
export const GET_VEHICLES_SHIPMENTS_URL = `${BASE_URL}/shipments/vehicles`;
