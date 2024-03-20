import {
  ADD_USER,
  DELETE_USER,
  DISABLE_USER_ACCOUNT,
  UPDATE_USER_CREDENTIALS,
  USER_LIST,
} from "../Utils/constant";
import clientAxios from "./axios";

export const disableUser = async (id) => {
  return clientAxios.delete(`${DISABLE_USER_ACCOUNT}/${id}`);
};

export const addUser = async (...data) => {
  return clientAxios.post(`${ADD_USER}`, ...data);
};

export const editCredentials = async (...data) => {
  return clientAxios.post(`${UPDATE_USER_CREDENTIALS}`, ...data);
};

export const userList = async (params) => {
  return clientAxios.get(
    `${USER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};
