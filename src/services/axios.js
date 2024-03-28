import axios from "axios";
import toast from "react-hot-toast";
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

clientAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      toast.error("Oops! problème de connexion.");
    } else if (error.response.status === 401) {
      toast.error("Vous n'êtes pas authentifié");
      localStorage.removeItem("userProfil");
      localStorage.removeItem("accessToken");
      window.location.replace("#/login");
    }
    return Promise.reject(error);
  }
);

export default clientAxios;
