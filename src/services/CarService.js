import {
  ADD_CAR,
  CAR_CHANGE_STATUS,
  CAR_DOC,
  CAR_LIST,
  PARTNER_CAR_DELETE,
} from "../Utils/constant";
import clientAxios from "./axios";

export const addCar = async (id, ...data) => {
  return clientAxios.post(`${ADD_CAR}/${id}`, ...data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllCars = async (params) => {
  return clientAxios.get(
    `${CAR_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const carFiles = async (id) => {
  return clientAxios.get(`${CAR_DOC}/${id}`);
};

export const changerStatus = async (id, ...data) => {
  return clientAxios.post(`${CAR_CHANGE_STATUS}/${id}`, ...data);
};

export const deleteCar = async (id) => {
  return clientAxios.delete(`${PARTNER_CAR_DELETE}/${id}`);
};
