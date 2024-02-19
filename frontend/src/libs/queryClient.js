
import { QueryClient } from "react-query";

import { apiBaseUrl } from "./constants";
import { defaultQueryFn } from "./defaultQueryFn";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { refreshAccessTokenFn } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: async (e) => {
        const err = JSON.parse(e.message);
        if (err.code2 === 401) {
          refreshAccessTokenFn();
        }
      },
    },
    queries: {
      retry: async (count, e) => {
        const err = JSON.parse(e.message);
        if (err.code2 === 401) {
          refreshAccessTokenFn();
        }
      },
      staleTime: 60 * 1000 * 1, // 5 minutes
      onError: (e) => {
        console.log(e);
      },
      queryFn: defaultQueryFn,
    },
  },
});