import { CATEGORY_CAR_LIST } from "../Utils/constant";
import clientAxios from "./axios";

export const getCarCategory = async (params) => {
  return clientAxios.get(
    `${CATEGORY_CAR_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};
