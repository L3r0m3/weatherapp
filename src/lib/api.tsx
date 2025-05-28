import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 5000,
});

export const geoApi = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0/",
  timeout: 5000,
});

export const apiBaseURL = axios.create({
  baseURL: "https://openweathermap.org/",
  timeout: 5000,
});
