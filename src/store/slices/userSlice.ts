import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ErrorType, RootState, UserDetails, UserLoginRequest, UserSliceState } from '@types';
import { useAppSelector } from '@hooks';

const userInitialState: UserSliceState = {
  loading: false,
  details: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserLoginRequest>) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }: PayloadAction<UserDetails>) => {
      state.details = payload;
      state.loading = false;
    },
    loginError: (state, { payload }: PayloadAction<ErrorType>) => {
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
