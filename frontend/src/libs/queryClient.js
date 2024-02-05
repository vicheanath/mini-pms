
import { QueryClient } from "react-query";

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
        
      },
      staleTime: 60 * 1000 * 1, // 5 minutes
      onError: (e) => {
        // refresh token if expired
        
      },
      queryFn: defaultQueryFn,
    },
  },
});