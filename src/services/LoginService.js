import { BASE_URL, LOGIN_ENDPOINT } from "../Utils/constant";
import clientAxios from "./axios";

export const loginUser = async (...data) => {
  return await clientAxios.post(`${BASE_URL + LOGIN_ENDPOINT}`, ...data);
};
