import { PARAMETTRE } from "../Utils/constant";
import clientAxios from "./axios";

export const addOrEditParamettre = async (...data) => {
  return clientAxios.post(`${PARAMETTRE}`, ...data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getParametre = async () => {
  return clientAxios.get("/webfree/course/rechercherparametrecourse");
};
