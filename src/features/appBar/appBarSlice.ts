import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from 'app/store';
// import appBarApi from './appBarAPI';

export interface Page {
  name: string,
  url: string
};

export interface AppBarState {
  status: 'logged_in' | 'not_logged_in',
  pages: Page[]
}

const initialState: AppBarState = {
  status: 'not_logged_in',
  pages: [
    { name: 'Teachers', url: '' },
    { name: 'Students', url: '' }
  ]
};

export const appBarSlice = createSlice({
  name: 'appBar',
  initialState,
  reducers: {
    // Use "slice.reducer" snippet.
  },
  extraReducers: (builder) => {
    // Use "slice.extraReducer" snippets.
  }
});

// export const { } = appBarSlice.actions;

export const selectPages = (state: RootState): Page[] => state.appBar.pages;

export default appBarSlice.reducer;
