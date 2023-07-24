export const getRoutePermissions = () => {
  const showRoute = {
    dashboard: true,
    orders: true,
    products: true,
    reports: true,
    controlPanel: true,
  };
  return { showRoute };
};
