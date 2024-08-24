import { jwtDecode } from "jwt-decode";
import { API } from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export async function refresh() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (refreshToken) {
    try {
      const res = await API.post("token/refresh/", { refresh: refreshToken });
      const { data } = res;
      const { access } = data;
      localStorage.setItem(ACCESS_TOKEN, access);
      return access;
    } catch (error) {
      return console.log(error);
    }
  }
  return console.log("No hay token de refresco");
}

export async function auth() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationToken = decodedToken.exp;
    const now = new Date() / 1000;
    if (now > expirationToken) {
      return await refresh();
    }
    return token;
  }
  return console.log("No hay token");
}
