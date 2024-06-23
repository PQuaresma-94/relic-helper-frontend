import { processServerResponse, baseUrl } from "./utils.js";

// Custom Teams Api Calls

// User Request

export const updateUserProfile = (userData) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then(processServerResponse)
    .then((data) => {
      const currentUserData = {
        currentUser: data.updateUser,
      };
      return currentUserData;
    });
};

// Custom Team Request

export const getTeams = () => {
  const token = localStorage.getItem("jwt");
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
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams/${teamId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const postTeam = (teamData) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams`, {
    method: "POST",
    body: JSON.stringify(teamData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const deleteTeam = (teamId) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/custom-teams/${teamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
