export const getUserProfil = () => {
  return JSON.parse(localStorage.getItem("userProfil"));
};

export const isLoggedIn = () => {
  return getUserProfil() ? true : false;
};
