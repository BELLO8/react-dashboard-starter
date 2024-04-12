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

export const months = [
  { code: 1, name: "Janvier" },
  { code: 2, name: "Février" },
  { code: 3, name: "Mars" },
  { code: 4, name: "Avril" },
  { code: 5, name: "Mai" },
  { code: 6, name: "Juin" },
  { code: 7, name: "Juillet" },
  { code: 8, name: "Août" },
  { code: 9, name: "Septembre" },
  { code: 10, name: "Octobre" },
  { code: 11, name: "Novembre" },
  { code: 12, name: "Décembre" },
];

export const years = [{ name: "2024" }, { name: "2023" }, { name: "2022" }];

export const tab = [
  {
    value: "VEHICULES",
    link: "Vehicules",
  },
  {
    value: "CHAUFFEURS",
    link: "Chauffeurs",
  },
  { value: "COURSES", link: "Courses" },
];

export const tabConfigs = [
  {
    value: "DISTANCE_LOCALISATION",
    link: "Distance",
  },
  {
    value: "FREQUENCE_LOCALISATION",
    link: "Frequence",
  },
  { value: "VERSION_DEPLOIEMENT", link: "Version" },
  { value: "SON", link: "Sonnerie" },
  { value: "AVIS", link: "Avis" },
];

export const status = [
  { value: "EN_COURS", link: "En cours" },
  {
    value: "TERMINE",
    link: "Validé",
  },
  { value: "REJETER", link: "Rejeté" },
];

export const statusCar = [
  {
    value: "ATTENTE_DE_VALIDATION",
    link: "En attente",
  },
  {
    value: "TERMINE",
    link: "Validé",
  },
  { value: "REJETER", link: "Rejeté" },
];
