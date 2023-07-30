import uniqid from 'uniqid';

import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';

import { useSnack } from '@hooks';
import { SnackType } from '@enums';
import { selectSnacks } from '@store';
import { CloseIcon, DeleteIcon, ErrorIcon, TaskIcon } from '@src/assets/icons';


export const Snacks = () => {
  const snacks = selectSnacks();
  const { hideSnack } = useSnack();
  const snack = snacks[0] || null;

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) => reason !== 'clickaway' && hideSnack();

  const getIcon = () => {
    switch (snack.type) {
      case SnackType.Error:
        return <ErrorIcon />;
      case SnackType.Delete:
        return <DeleteIcon />;
      default:
        return <TaskIcon />;
    }
  };

  const getBgColor = (theme: Theme) => {
    switch (snack.type) {
      case SnackType.Error:
        return theme.palette.error.main;
      case SnackType.Delete:
        return '#2F3032';
      default:
        return '#006D3C';
    }
  };

  return (
    <>
      {snack && (
        <Snackbar
          open
          key={uniqid()}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          // autoHideDuration={snack.timeout}
          onClose={handleClose}
          sx={{
            '& .MuiSvgIcon-root,& .MuiTypography-root': {
              color: (theme) => theme.palette.surface.default,
            },
          }}
        >
          <Box
            display="flex"
            sx={(theme) => ({
              px: 2,
              py: 1.5,
              alignItems: 'center',
              borderRadius: theme.spacing(0.5),
              boxShadow: '0 8px 16px 2px rgba(0, 0, 0, 0.16)',
              bgcolor: getBgColor(theme),
            })}
            data-testid={`${snack.type}Snack`}
          >
            {getIcon()}
            <Typography variant="labelM" sx={{ ml: 2 }}>
              {snack.message}
            </Typography>
            <CloseIcon sx={{ ml: 2, cursor: 'pointer' }} onClick={handleClose} />
          </Box>
        </Snackbar>
      )}
    </>
  );
};
