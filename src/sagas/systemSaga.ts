import i18n from 'i18next';
import { put, select, takeLatest } from 'redux-saga/effects';

import { systemAddError, systemUpdateNetworkConnection, systemUpdatePageFocus, addSnack } from '@store/slices';
import { SnackType } from '@enums';

export function* updateNetworkConnectionSaga() {
  const isBackOnline = yield select((state) => state.system.networkConnection.backOnline);

  try {
    yield put(
      addSnack(
        isBackOnline
          ? { type: SnackType.Success, message: i18n.t('connectionRestored'), clear: true }
          : { type: SnackType.Error, message: i18n.t('noConnection') },
      ),
    );
    if (isBackOnline) {
      yield put({ type: systemUpdatePageFocus.type, payload: { isActive: true } });
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(systemAddError(error));
    } else {
      console.error(error);
    }
  }
}

export function* systemSagaWatcher() {
  yield takeLatest(systemUpdateNetworkConnection.type, updateNetworkConnectionSaga);
}
