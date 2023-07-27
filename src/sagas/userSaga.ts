import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { API, clearStorageDataBeforeLogout, getStorageInitData, setHeaders } from '@utils';
import { login, logOut, loginError, loginSuccess } from '@store/slices';
import { Headers, UserRoles, ViewPermissions } from '@enums';

export function* userLoginSaga({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(API.post, `/auth/login`, payload);
    yield put(
      loginSuccess({
        id: data.user.userId,
        firstName: 'Gan',
        lastName: 'Seng Lok',
        login: data.user.email,
        roles: [UserRoles.ROLE_SUPERADMIN],
        permissions: [
          ViewPermissions.ViewControlPanel,
          ViewPermissions.ViewDashboard,
          ViewPermissions.ViewOrders,
          ViewPermissions.ViewProducts,
          ViewPermissions.ViewReports,
        ],
      }),
    );
    localStorage.setItem('access_token', data.tokens.access.token);
    localStorage.setItem('refresh_token', data.tokens.refresh.token);
    setHeaders({ [Headers.Authorization]: data.tokens.access.token });
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
