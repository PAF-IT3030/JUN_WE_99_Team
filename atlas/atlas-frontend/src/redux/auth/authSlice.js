import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loadingUser: false,
  user: null,
  userLoadingError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
    },
    clearAuth: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    getUser: (state) => {
      state.isLoggedIn = true;
      state.loadingUser = true;
    },
    userLoadingSuccess: (state, data) => {
      state.loadingUser = false;
      state.user = data.payload;
    },
    userLoadingError: (state, data) => {
      state.loadingUser = false;
      state.userLoadingError = data.payload;
    },
    userLoginSuccess: (state, data) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAction("resetState"), initialState);
  },
});

export const {
  loginUser,
  clearAuth,
  getUser,
  userLoadingError,
  userLoadingSuccess,
  userLoginSuccess,
} = authSlice.actions;

export default authSlice.reducer;
