import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState, InitSliceState } from '@types';
import { useAppSelector } from '@hooks';

const initialState: InitSliceState = {
  loading: true,
  status: false,
  error: null,
};

export const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    appInit: () => {},
    appInitSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.status = action.payload;
    },
    appInitError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setAppLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { appInit, appInitSuccess, setAppLoading, appInitError } = initSlice.actions;

export const selectInitLoading = () => useAppSelector((state: RootState) => state.init.loading);

const initReducer = initSlice.reducer;
export default initReducer;
