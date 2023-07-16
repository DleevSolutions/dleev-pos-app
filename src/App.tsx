import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import theme from './styles/theme';
import { globalStyles } from './styles';

import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { GlobalLoader, ProtectedRoute } from '@components';
import { MainLayout } from '@containers';
import { UserLogin, UserProfileSettings } from '@pages';

const App = () => {
  const isInitLoading = false;

  useEffect(() => {}, []);

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
            <MainLayout>
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
                  path={'/settings'}
                  element={
                    <ProtectedRoute isAllowed={true}>
                      <UserProfileSettings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
