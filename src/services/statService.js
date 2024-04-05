import {
  GRAPH_STATS_COURSES,
  GRAPH_STATS_SALES,
  STATS_COUNTER,
} from "../Utils/constant";
import clientAxios from "./axios";

export const counter = async (params) => {
  return await clientAxios.get(`${STATS_COUNTER}?date=${params.date}`);
};

export const statSales = async (...data) => {
  return await clientAxios.post(`${GRAPH_STATS_SALES}`, ...data);
};

export const statsCourses = async (...data) => {
  return await clientAxios.post(`${GRAPH_STATS_COURSES}`, ...data);
};
