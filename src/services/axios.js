import axios from "axios";
import { BASE_URL } from "../Utils/constant";

const clientAxios = axios.create({
  baseURL: BASE_URL,
});

clientAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default clientAxios;
