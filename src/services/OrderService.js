import { DRIVER_ORDER_HISTORY, ORDER_LIST } from "../Utils/constant";
import clientAxios from "./axios";

export const getOrders = async (params) => {
  return await clientAxios.get(
    `${ORDER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const getOrdersByDriver = async (params) => {
  return await clientAxios.get(
    `${DRIVER_ORDER_HISTORY}/${params.id}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};
