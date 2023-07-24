import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@types';
import { useAppSelector } from '@hooks';

const initialState: any = {
  loading: false,
  details: {},
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.details = payload;
      state.loading = false;
    },
    loginError: (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
      state.loading = false;
    },
    logOut: () => {},
  },
});

export const { logOut, login, loginSuccess, loginError } = userSlice.actions;

export const selectLoginLoading = () => useAppSelector((state: RootState) => state.user.loading);
export const selectLoginError = () => useAppSelector((state: RootState) => state.user.error);
export const selectUserDetails = () => useAppSelector((state: RootState) => state.user.details);

const userReducer = userSlice.reducer;
export default userReducer;
