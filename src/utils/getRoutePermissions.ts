import { ViewPermissions } from '@enums';
import { selectUserDetails } from '@store/slices/userSlice';

export const getRoutePermissions = () => {
  const permissions = selectUserDetails()?.permissions ?? [];
  const showRoute = {
    login: true,
    dashboard: false,
    orders: false,
    products: false,
    reports: false,
    controlPanel: false,
  };
  permissions.forEach((permission) => {
    switch (permission) {
      case ViewPermissions.ViewDashboard:
        showRoute.dashboard = true;
        break;
      case ViewPermissions.ViewOrders:
        showRoute.orders = true;
        break;
      case ViewPermissions.ViewProducts:
        showRoute.products = true;
        break;
      case ViewPermissions.ViewReports:
        showRoute.reports = true;
        break;
      case ViewPermissions.ViewControlPanel:
        showRoute.controlPanel = true;
        break;
      default:
        showRoute.login = false;
    }
  });
  return { showRoute };
};
