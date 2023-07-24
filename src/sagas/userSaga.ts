import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { API, clearStorageDataBeforeLogout, getStorageInitData } from '@utils';
import { login, logOut, loginError, loginSuccess } from '@store/slices';

export function* userLoginSaga({ payload }: PayloadAction<any>) {
  try {
    const data = yield call(API.post, `/auth/login`, payload);
    yield put(loginSuccess(data));
  } catch (error: any) {
    yield put(loginError(error));
    console.error(error);
  }
}

function* logOutSaga() {
  const initData = yield getStorageInitData();
  clearStorageDataBeforeLogout();
  if (initData) {
    window.location.replace(initData.logOutUrl);
  }
  window.location.replace('/');
}

export function* userSagaWatcher() {
  yield takeLatest(login.type, userLoginSaga);
  yield takeLatest(logOut.type, logOutSaga);
}
