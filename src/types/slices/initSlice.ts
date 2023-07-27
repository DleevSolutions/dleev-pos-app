import type { ErrorType } from '@types';

export type InitSliceState = {
  loading: boolean;
  status: boolean;
  error: ErrorType;
};
