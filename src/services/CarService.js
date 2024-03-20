import { ADD_CAR } from "../Utils/constant";
import clientAxios from "./axios";

export const addCar = async (...data) => {
  return clientAxios.post(`${ADD_CAR}`, ...data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
