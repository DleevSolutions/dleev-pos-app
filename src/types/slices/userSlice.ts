import type { ErrorType, UserDetails } from '@types';

export interface UserSliceState {
  loading: boolean;
  error: ErrorType | Error[] | null;
  details: UserDetails | null;
}
