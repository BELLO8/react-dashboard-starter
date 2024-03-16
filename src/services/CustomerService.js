import {
  ADD_CUSTOMER,
  CUSTOMER_INFO,
  CUSTOMER_LIST,
  CUSTOMER_ORDER,
  DISABLE_CUSTOMER,
} from "../Utils/constant";
import clientAxios from "./axios";

export const getCustomer = async (params) => {
  return await clientAxios.get(
    `${CUSTOMER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const getCustomerInfo = async (id) => {
  const response = await clientAxios
    .get(`${CUSTOMER_INFO}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {});
  return response;
};

export const addCustomer = async (...data) => {
  return await clientAxios.post(`${ADD_CUSTOMER}`, ...data);
};

export const disableAccount = async (id) => {
  return await clientAxios.post(`${DISABLE_CUSTOMER}/${id}`, {});
};

export const orderListByCustomer = async (params) => {
  return await clientAxios.get(
    `${CUSTOMER_ORDER}/${params.id}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};
