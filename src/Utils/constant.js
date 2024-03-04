export const BASE_URL = "";

export const getUserAuth = () => JSON.parse(localStorage.getItem("authUser"));

export const addToCart = (product) => {
  JSON.stringify(product);
};
