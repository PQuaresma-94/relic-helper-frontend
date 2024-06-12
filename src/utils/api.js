import { processServerResponse, baseUrl } from "./utils.js";

// Custom Teams Api Calls

// User Request (update after first review)

// Custom Team Request

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2MGNkMGM5ZjZhYmRjYmE0MTVmM2EiLCJpYXQiOjE3MTc5NjM5ODQsImV4cCI6MTcxODU2ODc4NH0.Pr4CHyUvJ5gACBbuYrQUsb5u-hTneIC7wGfn-s_gvWs";

export const getTeams = () => {
  // const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const getTeam = (teamId) => {
  //   const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams/${teamId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const postTeam = (teamId) => {
  //   const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams`, {
    method: "POST",
    body: JSON.stringify(teamId),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const deleteTeam = (teamId) => {
  //   const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams/${teamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
