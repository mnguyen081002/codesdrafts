import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";

// import { CmsApi } from "../../api/cms-api";
import { ReqLogin, ReqRegister } from "../../shared/types/authType";
// import { history } from "../../utils/history";
import { login, loginFailed, logout, register, registerFailed } from "./authSlice";

export function* handleLogin(params: ReqLogin) {
  try {
    yield call(async () => {
      // const res = await CmsApi.login({
      //   email: params.email,
      //   password: params.password,
      //   requestFrom: params.requestFrom,
      // });
      // localStorage.setItem("access_token", res.data.token.access_token);
      // localStorage.setItem("refresh_token", res.data.token.refresh_token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
    });

    // yield call(history.push, "/");
  } catch (error: any) {
    yield put(loginFailed(error.response.data.message));
  }
}

function* handleLogout() {
  localStorage.removeItem("access_token");
  // yield call(history.push, "/login");
}

function* handleRegister(params: ReqRegister) {
  try {
    yield call(async () => {
      // const res = await CmsApi.register({
      //   username: params.username,
      //   email: params.email,
      //   password: params.password,
      // });
    });

    // Redirect to Admin page
    // yield call(history.push, "/login");
  } catch (error: any) {
    yield put(registerFailed(error.response.data.message)); // Dispatch action
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const actionLogin: PayloadAction<ReqLogin> = yield take(login.type);
      yield call(handleLogin, actionLogin.payload);
    } else {
      yield take(logout.type);
      yield call(handleLogout);
    }
  }
}

function* watchRegisterFlow() {
  while (true) {
    const actionRegister: PayloadAction<ReqRegister> = yield take(register.type);
    yield call(handleRegister, actionRegister.payload);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
  yield fork(watchRegisterFlow);
}
