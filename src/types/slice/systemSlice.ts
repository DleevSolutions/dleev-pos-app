import { SystemModuleName } from '@enums';

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
  error: any;
}
