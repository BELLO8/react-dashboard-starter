import { DRIVER_INFO } from "../Utils/constant";
import clientAxios from "./axios";

export const getDriver = async (id) => {
  return clientAxios.get(`${DRIVER_INFO}/${id}`);
};
