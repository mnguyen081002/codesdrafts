import createSagaMiddleware from "@redux-saga/core";
import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";

import componentReducer from "../features/auth/componentsSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store:Store = configureStore({
  reducer: {
    components: componentReducer,
  },
  middleware: (getDefaultMiddleware:any) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;