import './i18n';

import useNavigatorOnline from 'use-navigator-online';
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { PayloadAction } from '@reduxjs/toolkit';

import theme from './styles/theme';
import { globalStyles } from './styles';
import { useAppDispatch } from './hooks';

import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { GlobalLoader, ProtectedRoute, Snacks } from '@components';
import { systemDispatch, systemUpdateNetworkConnection } from '@store/slices';
import { ControlPanel, DashBoard, Orders, Products, Reports, UserLogin } from '@pages';
import { getRoutePermissions } from '@utils';
import { MainLayout } from '@containers';
import { Event } from '@services';
import { ROUTES } from '@constants';

const App = () => {
  const dispatch = useAppDispatch();
  const { showRoute } = getRoutePermissions();
  const { isOnline, isOffline, backOnline, backOffline } = useNavigatorOnline();

  const loading = false;

  useEffect(() => {
    const onSystemDispatch = (action: PayloadAction<any>) => {
      if (action && action.type) dispatch(action);
    };
    Event.subscribe(systemDispatch.type, onSystemDispatch);

    let tickCount = 1;
    let timerId = setInterval(() => {
      Event.fire('TIMER_TICK', tickCount);
      tickCount = tickCount === 59 ? 1 : tickCount + 1;
    }, 60000);

    return () => {
      Event.unsubscribe(systemDispatch.type, onSystemDispatch);
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (backOnline || backOffline) {
      if (backOffline) {
        localStorage.setItem('lastPageActivityTimeStamp', JSON.stringify(new Date().getTime()));
      }
      dispatch({
        type: systemUpdateNetworkConnection.type,
        payload: {
          isOnline,
          isOffline,
          backOnline,
          backOffline,
        },
      });
    }
  }, [backOnline, backOffline]);

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        {globalStyles}
        <GlobalLoader invisible />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <Suspense fallback={<GlobalLoader />}>
            <Snacks />
            <Routes>
              <Route
                path={ROUTES.main}
                element={
                  <ProtectedRoute isAllowed={showRoute.login}>
                    <UserLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.dashboard}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={showRoute.dashboard}>
                      <DashBoard />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={ROUTES.orders}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={showRoute.orders}>
                      <Orders />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={ROUTES.products}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={showRoute.products}>
                      <Products />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={ROUTES.reports}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={showRoute.reports}>
                      <Reports />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={ROUTES.controlPanel}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={showRoute.controlPanel}>
                      <ControlPanel />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route path="*" element={<Navigate to="." replace />} />
            </Routes>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
