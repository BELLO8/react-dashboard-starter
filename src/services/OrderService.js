import { ORDER_LIST } from "../Utils/constant";
import clientAxios from "./axios";

export const getOrders = async (params) => {
  return await clientAxios.get(
    `${ORDER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};
