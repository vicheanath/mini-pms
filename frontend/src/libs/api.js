import axios from "axios";
import { apiBaseUrl } from "./constants";
import { selectAccessToken, selectRefreshToken } from "../features/auth/authSlice";
import { getCookie, setCookie } from "../hooks/useCookie";
export const accessTokenKey = "access";
export const refreshTokenKey = "refresh";

const accessToken = getCookie(accessTokenKey)
const refreshToken = getCookie(refreshTokenKey)
export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${accessToken}` || "",
  },
});
api.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async () => {
  const response = await api.post("token/refresh/", {
    refresh: refreshToken,
  });
  if (response.status === 200) {
    const { accessToken } = response.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setCookie(accessTokenKey, accessToken, { expires: 1 });
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
