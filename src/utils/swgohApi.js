import { processServerResponse, baseUrl } from "./utils";

export const getAllCharacters = () => {
  console.log(baseUrl);
  return fetch(`${baseUrl}/characters/all`).then(processServerResponse);
};

export const getLegendaryCharacters = () => {
  return fetch(`${baseUrl}/characters/legendary`).then(processServerResponse);
};

export const getRequiredUnits = (baseId) => {
  return fetch(`${baseUrl}/characters/legendary/${baseId}`).then(
    processServerResponse
  );
};
