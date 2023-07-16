import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { MainContentContainer } from '@containers';

export const UserLogin = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/settings');
  };
  return (
    <MainContentContainer>
      <Box>
        <Stack spacing={2}>
          <h3>User Login</h3>
          <Button onClick={handleLogin} variant={'outlined'} data-testid="formCancelButton">
            {'next route'}
          </Button>
        </Stack>
      </Box>
    </MainContentContainer>
  );
};
