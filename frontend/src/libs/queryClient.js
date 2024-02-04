import { useToast } from "@chakra-ui/react";
import { QueryClient } from "react-query";
import {
  accessTokenKey,
  refreshTokenKey,
  useTokenStore,
} from "../modules/auth/useTokenStore";
import { apiBaseUrl } from "./constants";
import { defaultQueryFn } from "./defaultQueryFn";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: async (e) => {},
    },
    queries: {
      retry: async (count, e) => {
        const error = JSON.parse(e.message);
        if (error.status_code === 403) {
          window.location.href = "/404";
        }
        if (error.code === "token_not_valid" || typeof e.code == "undefined") {
          return await refreshAuthToken();
        } else if (error.code === "bad_authorization_header") {
          localStorage.removeItem(accessTokenKey);
          localStorage.removeItem(refreshTokenKey);
          window.location.href = "/login";
        }
      },
      staleTime: 60 * 1000 * 1, // 5 minutes
      onError: (e) => {
        // refresh token if expired
        if (
          e.code === "token_not_valid" ||
          e.code === "bad_authorization_header"
        ) {
          window.location.href = "/login";
        }
      },
      queryFn: defaultQueryFn,
    },
  },
});

const refreshAuthToken = async () => {
  const { accessToken, refreshToken, userData } = useTokenStore.getState();
  const r = await fetch(`${apiBaseUrl}token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (r.status !== 200) {
    if (r.status === 401) {
      window.location.href = "/login";
    }
    // throw new Error(await r.text());
    window.location.href = "/login";
  } else {
    const { access: newAccessToken } = await r.json();
    const { user_id } = jwtDecode(newAccessToken);
    const requestUser = await axios.get(`${apiBaseUrl}users/${user_id}/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
    useTokenStore.setState((prev) => {
      prev.setTokens({
        refreshToken: refreshToken,
        userData: requestUser.data,
        accessToken: newAccessToken,
      });
      window.location.href = "/";
    });
  }
};
