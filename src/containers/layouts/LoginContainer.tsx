import { PropsWithChildren } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

import { WithSx } from '@types';
import { convertSxToArray } from '@utils';

import LanguageSelector from '@src/components/LanguageSelector/LanguageSelector';

type MainContentContainerProps = WithSx<
  PropsWithChildren<{
    fullHeight?: boolean;
    component?: BoxProps['component'];
  }>
>;

export const LoginContainer = ({
  children,
  fullHeight = false,
  component = 'main',
  sx = [],
}: MainContentContainerProps) => {
  return (
    <Box
      component={component}
      display="flex"
      data-testid={`LoginContainer`}
      sx={[
        () => ({
          width: 1,
          maxWidth: 1920,
          backgroundColor: '#909090',
        }),
        fullHeight && {
          height: { xs: '100vh', sm: '100vh' },
        },
        ...convertSxToArray(sx),
      ]}
    >
      <Stack className="position-absolute top-0 end-0 p-3">
        <LanguageSelector />
      </Stack>
      {children}
    </Box>
  );
};
