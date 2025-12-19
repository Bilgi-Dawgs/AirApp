import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

export const rosterApi = {
  get: (flightNumber) => api.get(`/rosters/${flightNumber}`),

  generate: (flightNumber, config) =>
    api.post(`/rosters/${flightNumber}`, config),
};
