import { DISABLE_CUSTOMER, UPDATE_USER_CREDENTIALS } from "../Utils/constant";
import clientAxios from "./axios";

export const disableAccount = async (id) => {
  return clientAxios.put(`${DISABLE_CUSTOMER}/${id}`);
};

export const editCredentials = async (...data) => {
  return clientAxios.post(`${UPDATE_USER_CREDENTIALS}`, ...data);
};
