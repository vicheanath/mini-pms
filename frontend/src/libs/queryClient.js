
import { QueryClient } from "react-query";

import { apiBaseUrl } from "./constants";
import { defaultQueryFn } from "./defaultQueryFn";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: async (e) => {
        const err = JSON.parse(e.message);
        console.log(err);
      },
    },
    queries: {
      retry: async (count, e) => {
        const err = JSON.parse(e.message);
        console.log(err);
        if (err.code2 === 401) {
          localStorage.clear();
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