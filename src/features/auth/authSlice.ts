import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { ReqLogin, ReqRegister, Token, User } from "../../shared/types/authType";

interface InitialState {
  user: User | null;
  isLoggedIn: boolean;
  token: Token | null;
  login: {
    error: string | null | undefined;
    loading: boolean;
  };
  register: {
    error: string | null | undefined;
    loading: boolean;
    message: string | null | undefined;
  };
}

const initialState: InitialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  login: {
    error: null,
    loading: false,
  },
  register: {
    error: null,
    loading: false,
    message: null,
  },
};

const componentsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<ReqLogin>) {
      state.login.loading = true;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.login.loading = false;
      state.login.error = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.login.loading = false;
      state.user = null;
    },

    register(state, action: PayloadAction<ReqRegister>) {
      state.isLoggedIn = false;
      state.register.loading = true;
    },

    registerFailed(state, action: PayloadAction<string>) {
      state.register.error = action.payload;
      state.register.loading = false;
    },
  },
});

export const { login, loginFailed, logout, register, registerFailed } = componentsSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsLoadingLogin = (state: RootState) => state.auth.login.loading;
export const selectLoginError = (state: RootState) => state.auth.login.error;
export const selectIsLoadingRegister = (state: RootState) => state.auth.register.loading;
export const selectRegisterError = (state: RootState) => state.auth.register.error;

export default componentsSlice.reducer;
