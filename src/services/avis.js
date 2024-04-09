import { ADD_AVIS, AVIS } from "../Utils/constant";
import clientAxios from "./axios";

export const avis = async () => {
  return clientAxios.get(`${AVIS}`);
};

export const addAvis = async (...data) => {
  return clientAxios.post(`${ADD_AVIS}`, ...data);
};
