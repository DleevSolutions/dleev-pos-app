import { Reducer } from '@reduxjs/toolkit';

import initReducer from './initSlice';

export const rootReducers: { [key: string]: Reducer } = {
  init: initReducer,
};
