// @ts-nocheck
import { ERROR_CODES } from '../global/errors';

export const getAxiosResponseErrorCodeExceptionsList = async () => {
  return [ERROR_CODES.ERR_CANCELED, ERROR_CODES.ERR_NETWORK];
};

export const getAxiosResponseErrorUrlExceptionList = async () => {
  return [];
};
