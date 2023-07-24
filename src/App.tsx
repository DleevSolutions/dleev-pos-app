import './i18n';

import useNavigatorOnline from 'use-navigator-online';
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import theme from './styles/theme';
import { globalStyles } from './styles';
import { useAppDispatch } from './hooks';

import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { GlobalLoader, ProtectedRoute, Snacks } from '@components';
import { systemDispatch, systemUpdateNetworkConnection } from '@store/slices';
import { ControlPanel, DashBoard, Orders, Products, Reports, UserLogin } from '@pages';
import { MainLayout } from '@containers';
import { PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@services/Event/Event';

const App = () => {
  const dispatch = useAppDispatch();
  const { isOnline, isOffline, backOnline, backOffline } = useNavigatorOnline();
  const isInitLoading = false;

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

  if (isInitLoading)
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
                path={'/'}
                element={
                  <ProtectedRoute isAllowed={true}>
                    <UserLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <UserLogin />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={'/dashboard'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <DashBoard />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={'/orders'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <Orders />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={'/products'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <Products />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={'/reports'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <Reports />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path={'/control-panel'}
                element={
                  <MainLayout>
                    <ProtectedRoute isAllowed={true}>
                      <ControlPanel />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
