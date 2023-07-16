import createSagaMiddleware from 'redux-saga';
import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';

import type { StoreWithDynamicReducers } from '@types';
import { rootReducers } from './slices';

export const reducers: { [key: string]: Reducer } = rootReducers;

export const createDynamicReducer = (
  asyncReducers: { [key: string]: Reducer } = {},
): ReturnType<typeof combineReducers> => {
  return combineReducers({
    ...asyncReducers,
    ...reducers,
  });
};

export const reducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

const initStore = () => {
  const store: StoreWithDynamicReducers = configureStore({
    reducer: createDynamicReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: false,
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.asyncReducers = {};
  store.injectReducer = (key: string, reducer: Reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createDynamicReducer(store.asyncReducers));
    return store;
  };

  return store;
};

export const store = initStore();

export const runSaga = sagaMiddleware.run;
