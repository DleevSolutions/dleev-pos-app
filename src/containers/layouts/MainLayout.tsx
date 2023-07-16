import Box from '@mui/material/Box';

import type { PropsWithChildren } from 'react';

import { WithSx } from '@types';
import { convertSxToArray } from '@utils';
import { NoPermissions } from '@containers';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

type MainLayoutProps = WithSx<PropsWithChildren<{}>>;

export const MainLayout = ({ children, sx = [] }: MainLayoutProps) => {
  const userPermissions = true;

  if (!userPermissions) return <NoPermissions />;
  return (
    <ErrorBoundary logErrors>
      {children}
      <Box
        sx={[
          (theme) => ({
            zIndex: theme.zIndex.tooltip,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `solid 1px ${theme.palette.border.default}`,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: theme.palette.surface.default,
          }),
          ...convertSxToArray(sx),
        ]}
      ></Box>
    </ErrorBoundary>
  );
};
