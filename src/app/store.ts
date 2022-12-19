import createSagaMiddleware from "@redux-saga/core";
import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";

import lessonReducer from "../features/auth/LessonSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store: Store = configureStore({
  reducer: {
    lesson: lessonReducer,
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(sagaMiddleware),
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