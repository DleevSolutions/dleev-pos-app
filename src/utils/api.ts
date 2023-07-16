const { API_URL } = require('Config');

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Headers } from '@enums';
import { getStorageInitData, clearData, clearStorageDataBeforeLogout } from '@utils';
import { getAxiosResponseErrorCodeExceptionsList, getAxiosResponseErrorUrlExceptionList } from '@constants';

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
    const hasHandledErrorCode = error.response?.data ? error.response.data.length > 0 : false;
    const errorCode = hasHandledErrorCode ? error.response?.data?.map((error) => error?.code) : (error.code as string);
    const url = error?.config?.url ?? '';
    const codeExceptions = await getAxiosResponseErrorCodeExceptionsList();
    const urlExceptions = await getAxiosResponseErrorUrlExceptionList();

    if (url === '/pm/users/me/summary' && error?.response?.status === 403) {
      const initData = getStorageInitData();
      if (initData) {
        clearStorageDataBeforeLogout();
        window.location.replace('/');
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
    return Promise.reject(error);
  },
);
