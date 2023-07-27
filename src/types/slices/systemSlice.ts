import { SystemModuleName } from '@enums';
import type { ErrorType } from '../api';

export interface SystemSliceState {
  moduleBuildVersions: {
    [SystemModuleName.Merchant]?: string;
  };
  networkConnection: {
    isOnline: boolean;
    isOffline: boolean;
    backOnline: boolean;
    backOffline: boolean;
  };
  timeZone: string;
  page: {
    isActive: boolean;
  };
  error: ErrorType;
}
