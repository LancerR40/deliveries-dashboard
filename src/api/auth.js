import axios from "axios";
import { LOGIN_URL, CHECK_SESSION_URL } from "./constants";

export const checkSessionAPI = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const request = await axios.get(CHECK_SESSION_URL, {
      withCredentials: true,
      headers: {
        "x-authorization-token": token,
      },
    });

    return request.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/auth/login";
    }

    return false;
  }
};

export const loginAPI = async (data) => {
  try {
    const request = await axios.post(LOGIN_URL, data, {
      withCredentials: true,
    });

    return request.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
