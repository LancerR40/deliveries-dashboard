import axios from "axios";
import { USER_DATA } from "./constants";

export const getUserAPI = async () => {
  try {
    const request = await axios.get(USER_DATA, {
      withCredentials: true,
      headers: {
        "x-authorization-token": localStorage.getItem("token"),
      },
    });

    return request.data;
  } catch (error) {
    return error;
  }
};
