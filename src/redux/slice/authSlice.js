import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  userList: [],
  error: null,
  carts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoading: (state) => {
      state.loading = true;
    },
    newUser: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.userList.push(payload);
      state.error = null;
    },
    loginUser: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    errorUser: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    authLogout: (state) => {
      state.loading = false;
      state.user = null;
    },
    updateProfileImage: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    falseLoading: (state) => {
      state.loading = false;
    },

    changePassword: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },

    forgetPassword: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    resetPassword: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    updatePassword: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },

    verifyRequest: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },

    verifySuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
  },
});

export const {
  authLoading,
  newUser,
  loginUser,
  errorUser,
  authLogout,
  updateProfileImage,
  falseLoading,
  changePassword,
  forgetPassword,
  resetPassword,
  updatePassword,
  verifyRequest,
  verifySuccess,
} = authSlice.actions;

export default authSlice.reducer;
