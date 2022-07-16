import axios from "axios";
import { USER_DATA } from "./constants";

export const getUserAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(USER_DATA, {
      headers: {
        "x-authorization-token": token,
      },
    });

    return request.data;
  } catch (error) {
    return error;
  }
};
