import { MouseEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type { WithSx } from '@types';
import { convertSxToArray } from '@utils';
import { useAppDispatch } from '@hooks/storeHooks';
import { logOut, selectUserDetails } from '@store';
import { drawerMenuItems, navTabs, ROUTES } from '@constants';

import logo from '@assets/logo.svg';

import { TopNavigation } from './components/TopNavigation';
import { NavigationDrawer } from './components/NavigationDrawer';

type HeaderProps = WithSx;

export const Header = ({ sx = [] }: HeaderProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const user = selectUserDetails();
  const navigate = useNavigate();

  const [userRole] = useState(user?.role ?? 'Gay');
  const [username] = useState(`${user?.firstName ?? 'Mr.'} ${user?.lastName ?? 'Eason'}`);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleLogOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const redirectToSettings = useCallback(() => navigate(`/${ROUTES.controlPanel}`), [navigate, ROUTES]);

  return (
    <Paper
      component="header"
      data-testid="header"
      square
      sx={[
        (theme) => ({
          zIndex: theme.zIndex.appBar,
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          borderBottom: `solid 1px ${theme.palette.border.default}`,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          bgcolor: theme.palette.surface.default,
        }),
        ...convertSxToArray(sx),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1920,
          mx: 'auto',
          px: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            data-testid="headerBurgerButton"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ display: { md: 'none' }, p: 0, mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          <Box component={Link} sx={{ mr: 0.25, display: 'flex' }} to="/">
            <img src={logo} alt="logo" width={87} height={38} />
          </Box>
          <TopNavigation tabs={navTabs} />
        </Box>

        <Box display="flex" py={1}>
          <Stack spacing={2} direction="row">
            {user && (
              <>
                <IconButton onClick={handleClick} disableRipple sx={{ p: 0 }} data-testid="headerAvatarButton">
                  <Avatar sx={{ width: 40, height: 40 }} src={user?.image}>
                    {username}
                  </Avatar>
                </IconButton>
                <Menu
                  disableScrollLock={true}
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={({ palette, spacing }) => ({
                      p: spacing(1, 2),
                      borderBottom: `solid 1px ${palette.border.default}`,
                    })}
                  >
                    <Avatar sx={{ width: 64, height: 64 }} src={user?.image}>
                      {username}
                    </Avatar>
                    <Stack
                      direction="column"
                      spacing={0.5}
                      sx={({ spacing }) => ({
                        maxWidth: spacing(21.5),
                      })}
                    >
                      <Typography variant="paragraphM">{`${username} (${t('header.you')})`}</Typography>
                      <Typography
                        variant="labelS"
                        sx={(theme) => ({
                          color: theme.palette.text.secondary,
                        })}
                      >
                        {userRole}
                      </Typography>
                    </Stack>
                  </Stack>
                  <MenuItem onClick={redirectToSettings} data-testid="profileSettingsMenuItem">
                    <Typography variant="paragraphM">{t('button.profileSettings')}</Typography>
                  </MenuItem>
                  <Divider sx={(theme) => ({ m: '0 !important', borderColor: theme.palette.border.default })} />
                  <MenuItem onClick={handleLogOut} data-testid="logoutMenuItem">
                    <Typography variant="paragraphM">{t('button.logOut')}</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Box>

        <NavigationDrawer
          sx={(theme) => ({ width: theme.spacing(33.75) })}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          items={drawerMenuItems}
        />
      </Box>
    </Paper>
  );
};
