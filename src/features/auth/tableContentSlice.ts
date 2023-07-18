import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export interface ITableOfCOntents {
  title: string;
  children: ITableOfCOntents[];
}

const initialState: ITableOfCOntents = {
  title: '',
  children: [],
};

const TableContentSlice = createSlice({
  name: 'tableContent',
  initialState,
  reducers: {
    saveTableContent(state, action: PayloadAction<ITableOfCOntents>) {
      state.title = action.payload.title;
      state.children = action.payload.children;
    },
  },
});

export const { saveTableContent: updateTableContent } = TableContentSlice.actions;

export const selectTableOfContent = (state: RootState) => state.tableContent;
export default TableContentSlice.reducer;
