import type { Action, Store, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import appReducer from '../features/auth/appSlice';
import tableContentSlice from '../features/auth/tableContentSlice';

const sagaMiddleware = createSagaMiddleware();
export const store: Store = configureStore({
  reducer: {
    tableContent: tableContentSlice,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
