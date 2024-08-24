import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { auth } from "./auth";

export const API = axios.create({ baseURL: "http://localhost:8000/api/" });

export const APIToken = axios.create({ baseURL: "http://localhost:8000/api/" });

APIToken.interceptors.request.use(
  async (config) => {
    const token = await auth();
    if (token) {
      console.log(token);

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
