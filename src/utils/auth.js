import { processServerResponse, baseUrl } from "./utils.js";

export const register = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(processServerResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(processServerResponse)
    .then((data) => {
      if (data) {
        localStorage.setItem("jwt", data.token);

        return data.token;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .then((userData) => {
      return userData;
    });
};
