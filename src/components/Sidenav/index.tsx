import { Drawer, Icon, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { Dispatch, memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import logo from '@assets/images/logo.png';
import VerticalNav from '@components/VerticalNav/VerticalNav';
import appTheme, { sideNavWidth } from '@config/theme';

export type SidenavProps = {
  openDrawer: boolean;
  handleDrawerToggle: Dispatch<any>;
  window?: () => Window;
};

const menuItems = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/',
  },
  {
    name: 'Categories',
    icon: 'category',
    path: '/categories',
  },
];

const Sidenav = ({ openDrawer, handleDrawerToggle }: SidenavProps) => {
  return (
    <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Image src={logo} alt="mond.bet" width={106} height={56} />
        <IconButton onClick={handleDrawerToggle}>
          {appTheme.direction === 'ltr' ? (
            <Icon>chevron_left</Icon>
          ) : (
            <Icon>chevron_right</Icon>
          )}
        </IconButton>
      </Box>
      <PerfectScrollbar>
        <VerticalNav
          items={menuItems}
          handleDrawerToggle={handleDrawerToggle}
        />
      </PerfectScrollbar>
    </Drawer>
  );
};

export default memo(Sidenav);
