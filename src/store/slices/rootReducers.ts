import { Reducer } from '@reduxjs/toolkit';

import initReducer from './initSlice';
import systemReducer from './systemSlice';
import snackReducer from './snackSlice';
import userReducer from './userSlice';

export const rootReducers: { [key: string]: Reducer } = {
  init: initReducer,
  system: systemReducer,
  snack: snackReducer,
  user: userReducer,
};
