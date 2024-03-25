import {
  CHANGE_DRIVER,
  DRIVER_INFO,
  DRIVER_LIST,
  DRIVER_PIECES,
  PARTNER_DISOCIATE_DRIVER_CAR,
  PARTNER_DRIVER_CAR_ASSOCIATE,
  PARTNER_DRIVER_DELETE,
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

export const deleteCarDriver = async (driverId, vehiculeId) => {
  return clientAxios.delete(
    `${PARTNER_DISOCIATE_DRIVER_CAR}/${driverId}/vehicule/${vehiculeId}`,
    {}
  );
};

export const deleteDriver = async (driverId) => {
  return clientAxios.delete(`${PARTNER_DRIVER_DELETE}/${driverId}`, {});
};

export const getPieces = async (driverId) => {
  return clientAxios.get(`${DRIVER_PIECES}/${driverId}`);
};
