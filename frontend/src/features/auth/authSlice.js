import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access");
const refreshToken = Cookies.get("refresh");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: true,
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
  },
});

export const { login, logout, setUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;
