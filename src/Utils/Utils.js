import clientAxios from "../services/axios";

export const getUserProfil = () => {
  return JSON.parse(localStorage.getItem("userProfil"));
};

export const isLoggedIn = () => {
  return getUserProfil() ? true : false;
};

export const getImg = async (id) => {
  const image = await clientAxios.get(`/admin/partenaire/fichier/${id}`);
  return image.data;
};
