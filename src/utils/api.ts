const { API_URL } = require('Config');
import i18n from 'i18next';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import {
  getAxiosResponseErrorCodeExceptionsList,
  getAxiosResponseErrorUrlExceptionList,
  ERROR_CODES,
  ERROR_CUSTOM_SNACKS,
} from '@constants';
import { Event } from '@services';
import { SnackType, Headers } from '@enums';
import { getStorageInitData, clearData, clearStorageDataBeforeLogout } from '@utils';
import { addSnack, systemDispatch } from '@store';

export const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

setInitialHeaders();

export const setHeaders = (headers: { [key: string]: string }, axiosInstance: AxiosInstance = API) => {
  const commonHeaders = { ...axiosInstance.defaults.headers.common };

  Object.keys(headers).forEach((key) => (commonHeaders[key] = headers[key]));

  axiosInstance.defaults.headers.common = commonHeaders;
};

export const deleteHeaders = (headerKeys: string[], axiosInstance: AxiosInstance = API) => {
  const commonHeaders = { ...axiosInstance.defaults.headers.common };

  headerKeys.forEach((key) => commonHeaders[key] && delete commonHeaders[key]);

  axiosInstance.defaults.headers.common = commonHeaders;
};

/** Reading localstorage data and adding common headers on axios initialization */
export function setInitialHeaders() {
  const access_token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {};
  if (access_token) {
    API.defaults.headers.common[Headers.Authorization] = access_token;
  }
  return headers;
}

API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.data && !(config.data instanceof URLSearchParams)) {
      config.data = clearData(config.data, {
        leaveEmptyArrays: true,
        leaveEmptyStrings: false,
        multilineFields:
          config.headers && config.headers['multiline-fields']
            ? (config.headers['multiline-fields'] as any).split(',')
            : [],
      });
    }
    if (config.headers && config.headers['multiline-fields']) {
      delete config.headers['multiline-fields'];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error: AxiosError<{ code: number | string }[]>) => {
    let skipMessageDisplay = false;
    const hasHandledErrorCode =
      error.response?.data && Array.isArray(error.response.data) && error.response.data.length > 0;
    const errorCode = hasHandledErrorCode ? error.response?.data?.map((error) => error.code) : error.code;
    const url = error?.config?.url ?? '';
    const codeExceptions = await getAxiosResponseErrorCodeExceptionsList();
    const urlExceptions = await getAxiosResponseErrorUrlExceptionList();

    if (url === '/pm/users/me/summary' && error?.response?.status === 403) {
      const initData = getStorageInitData();
      if (initData) {
        clearStorageDataBeforeLogout();
      }
    }

    if (!skipMessageDisplay && url) {
      skipMessageDisplay = urlExceptions.reduce((res, url) => {
        return !res ? error.config.url!.includes(url) : res;
      }, false);
    }
    if (!skipMessageDisplay && errorCode && errorCode?.length > 0) {
      skipMessageDisplay = codeExceptions.some((exception) =>
        Array.isArray(errorCode) ? errorCode.includes(exception) : exception === errorCode.toString(),
      );
    }
    if (!skipMessageDisplay && errorCode) {
      Event.fire(systemDispatch.type, {
        type: addSnack.type,
        payload: ERROR_CUSTOM_SNACKS[errorCode.toString() as ERROR_CODES] || {
          type: SnackType.Error,
          message: i18n.exists(`errors:${errorCode}`) ? i18n.t(`errors:${errorCode}`) : i18n.t('errors:SYSTEM_ERROR'),
        },
      });
    }
    return Promise.reject(error);
  },
);
