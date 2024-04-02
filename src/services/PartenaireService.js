import {
  ADD_DRIVER,
  ADD_PARTNER,
  DISABLE_PARTNER_ACCOUNT,
  PARTNER_CAR_LIST,
  PARTNER_CHANGE_STATUS,
  PARTNER_DELETE,
  PARTNER_DOC,
  PARTNER_DRIVER_LIST,
  PARTNER_INFO,
  PARTNER_LIST,
  PARTNER_ORDER_LIST,
} from "../Utils/constant";
import clientAxios from "./axios";

export const getPartners = async (params) => {
  return clientAxios.get(
    `${PARTNER_LIST}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const addPartner = async (...data) => {
  return clientAxios.post(`${ADD_PARTNER}`, ...data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getPartnerInfo = async (id) => {
  const response = await clientAxios
    .get(`${PARTNER_INFO}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {});
  return response;
};

export const disablePartner = async (id) => {
  return clientAxios.post(`${DISABLE_PARTNER_ACCOUNT}/${id}`, {});
};

export const deletePartner = async (id) => {
  return clientAxios.delete(`${PARTNER_DELETE}/${id}`, {});
};

export const getCarByPartner = async (params) => {
  return clientAxios.get(
    `${PARTNER_CAR_LIST}${params.id}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const addDriver = async (id, ...data) => {
  return clientAxios.post(`${ADD_DRIVER}/${id}`, ...data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getDriverByPartner = async (params) => {
  return clientAxios.get(
    `${PARTNER_DRIVER_LIST}/${params.id}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const getOrderPartner = async (params) => {
  return clientAxios.get(
    `${PARTNER_ORDER_LIST}/${params.id}?page=${params.page}&param=${params.param}&size=${params.size}`
  );
};

export const changerStatusPartner = async (id, ...data) => {
  return clientAxios.post(`${PARTNER_CHANGE_STATUS}/${id}`, ...data);
};

export const partnerDocument = async (id) => {
  return clientAxios.get(`${PARTNER_DOC}/${id}`);
};
