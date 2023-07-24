import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import type { DrawerProps } from '@mui/material/Drawer';

import type { MenuProps } from './components/Menu';
import { Menu } from './components/Menu';

import { WithSx } from '@types';
import { convertSxToArray } from '@utils';
import { Typography } from '@mui/material';

export type NavigationDrawerProps = WithSx<{
  isOpen: DrawerProps['open'];
}> &
  MenuProps;

export const NavigationDrawer = ({ isOpen, onClose, items, sx = [] }: NavigationDrawerProps) => {
  const { t: tCommon } = useTranslation('common');
  return (
    <Drawer open={isOpen} onClose={onClose} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
      <Box
        sx={[
          (theme) => ({
            pt: 3,
            pb: { xs: 0, sm: theme.spacing(0) },
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.surface.default,
          }),
          ...convertSxToArray(sx),
        ]}
      >
        <Box
          sx={(theme) => ({
            px: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1,
            borderBottom: `solid 1px ${theme.palette.border.default}`,
            '& nav': { m: 0 },
          })}
        >
          <Menu onClose={onClose} items={items} sx={(theme) => ({ mb: theme.spacing(1) })} />
        </Box>

        {/* <Footer place={FooterPlace.Drawer} /> */}
      </Box>
      <Grid
        className="w-100"
        sx={({ palette }) => ({
          backgroundColor: palette.error.main,
        })}
      >
        <IconButton className="w-100 p-4" onClick={onClose} disableRipple>
          <Typography
            sx={({ palette }) => ({
              color: palette.text.white,
            })}
          >
            {tCommon('button.close')}
          </Typography>
        </IconButton>
      </Grid>
    </Drawer>
  );
};
