import { BASE_URL } from "../Utils/constant";

export const Login = (data) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "mor_2314",
      password: "83r5^_",
    }),
  }).then((res) => {
    res.json();
  });
};
