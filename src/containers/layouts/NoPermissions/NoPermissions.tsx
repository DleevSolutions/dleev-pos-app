import { Box, Button, Stack, Typography } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { MainContentContainer } from '@containers/layouts/MainContentContainer';

export const NoPermissions = () => {
  const { t: tCommon } = useTranslation('common');

  const handleLogOut = useCallback(() => {
    console.log('Logout');
  }, []);
  return (
    <MainContentContainer fullHeight sx={{ width: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 1,
          height: 1,
        }}
      >
        <Stack direction="column" alignItems="center" spacing={3} sx={(theme) => ({ maxWidth: theme.spacing(50) })}>
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: theme.spacing(16),
              height: theme.spacing(16),
              background: 'rgba(26, 28, 30, 0.08)',
              borderRadius: theme.spacing(8),
            })}
          >
            <ContentPasteSearchIcon sx={{ fontSize: '48px' }} />
          </Box>
          <Typography align="center">{tCommon('anyResponsibilities')}</Typography>
          <Button variant="contained" size="medium" onClick={handleLogOut} data-testid="logOutButton">
            {'Logout'}
          </Button>
        </Stack>
      </Box>
    </MainContentContainer>
  );
};
