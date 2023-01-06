import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export interface CustomSnackbar {
  message: string | null | undefined;
  type: 'success' | 'error' | 'info' | 'warning' | 'undefined';
  openSnackbar: boolean;
}

interface InitialState {
  loading: boolean;
  snackBar: CustomSnackbar;
}

const initialState: InitialState = {
  loading: false,
  snackBar: {
    message: '',
    type: 'undefined',
    openSnackbar: false,
  },
};

const componentsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSnackBar(state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) {
      state.snackBar = {
        message: action.payload.message,
        type: action.payload.type,
        openSnackbar: true,
      };
    },
    closeSnackBar(state) {
      state.snackBar = {
        message: '',
        type: 'undefined',
        openSnackbar: false,
      };
    },
  },
});

export const { setLoading, setSnackBar, closeSnackBar } = componentsSlice.actions;

export default componentsSlice.reducer;
export const selectLoading = (state: RootState) => state.app.loading;
export const selectSnackBar = (state: RootState) => state.app.snackBar;
