import {
  Box,
  Container,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MouseEvent, MouseEventHandler, useState } from 'react';

import appTheme, { sideNavWidth } from '@config/theme';

type HeaderProps = {
  openDrawer: boolean;
  handleDrawerToggle: MouseEventHandler<HTMLButtonElement>;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sideNavWidth}px)`,
    marginLeft: `${sideNavWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({
  openDrawer,
  handleDrawerToggle,
}: HeaderProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(
    null,
  );
  const { push } = useRouter();
  const { data, status } = useSession();

  const handlePush = (href: string) => {
    closeAll();
    push(`/${href}`);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSettingsMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/login' });
    push(data.url);
  };

  const closeAll = () => {
    handleCloseUserMenu();
    handleCloseSettingsMenu();
  };

  return (
    <AppBar position="fixed" open={openDrawer} elevation={1}>
      <Container maxWidth={false}>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          disableGutters
        >
          <Box>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                color: appTheme.palette.text.primary,
                ...(openDrawer && { display: 'none' }),
              }}
            >
              <Icon>menu</Icon>
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Box>
              <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                  <Icon
                    sx={{
                      mr: 2,
                      color: appTheme.palette.text.primary,
                    }}
                  >
                    settings
                  </Icon>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-settings"
                anchorEl={anchorElSettings}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElSettings)}
                onClose={handleCloseSettingsMenu}
              >
                <Box sx={{ padding: '0.4rem', minWidth: '200px' }}>
                  <MenuItem onClick={() => handlePush('user')}>
                    <Typography textAlign="center">Usuários</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      Grupo de usuários
                    </Typography>
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
            <Box>
              <Tooltip title="Open My Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Icon sx={{ color: appTheme.palette.text.primary }}>
                    account_circle
                  </Icon>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {status === 'authenticated' && (
                  <Box>
                    <Box
                      sx={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0',
                      }}
                    >
                      <Typography sx={{ fontWeight: '600' }}>
                        {data?.user?.name}
                      </Typography>
                      <Typography variant="caption">
                        {data?.user?.email}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                )}
                <Box
                  sx={{ padding: '0.4rem 0.4rem 0 0.4rem', minWidth: '200px' }}
                >
                  <MenuItem onClick={() => handlePush('my-profile')}>
                    <Typography textAlign="center">Meus dados</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Sair</Typography>
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
