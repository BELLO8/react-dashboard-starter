import {
  CHANGE_DRIVER,
  DRIVER_INFO,
  DRIVER_LIST,
  PARTNER_DRIVER_CAR_ASSOCIATE,
} from "../Utils/constant";
import clientAxios from "./axios";

export const getDriver = async (id) => {
  return clientAxios.get(`${DRIVER_INFO}/${id}`);
};

export const getDrivers = async (params) => {
  return clientAxios.get(
    `${DRIVER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const changerStatus = async (id, ...data) => {
  return clientAxios.post(`${CHANGE_DRIVER}/${id}`, ...data);
};

export const associateDriver = async (driverId, vehiculeId) => {
  return clientAxios.post(
    `${PARTNER_DRIVER_CAR_ASSOCIATE}/${driverId}/vehicule/${vehiculeId}`,
    {}
  );
};
