import { CATEGORY_CAR_LIST, EDIT_CATEGORY_CAR } from "../Utils/constant";
import clientAxios from "./axios";

export const getCarCategory = async (params) => {
  return clientAxios.get(
    `${CATEGORY_CAR_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const editCarCategoryDescription = async (id, description, nouchi) => {
  return clientAxios.post(
    `${EDIT_CATEGORY_CAR}/${id}?description=${description}&nouchi=${nouchi}`,
    {}
  );
};
