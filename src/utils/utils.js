// Update production enviroment after deploy to vm
export const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
};
