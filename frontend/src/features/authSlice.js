import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { accessTokenKey, refreshTokenKey } from "../libs/api";

const accessToken = localStorage.getItem(accessTokenKey);
const refreshToken = localStorage.getItem(refreshTokenKey);


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setUser ,setIsAuthenticated } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;
