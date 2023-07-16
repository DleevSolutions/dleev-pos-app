import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { MainContentContainer } from '@containers';

export const UserProfileSettings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return (
    <MainContentContainer>
      <Box>
        <Stack spacing={2}>
          <h3>User Settings</h3>
          <Button onClick={handleLogout} variant={'outlined'} data-testid="formCancelButton">
            {'next route'}
          </Button>
        </Stack>
      </Box>
    </MainContentContainer>
  );
};
