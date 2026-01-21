import { Box, Toolbar, styled } from '@mui/material';
import { useState } from 'react';

import Header from '@components/Header';
import Sidenav from '@components/Sidenav';
import { sideNavWidth } from '@config/theme';

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '100%',
  height: '100%',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${sideNavWidth}px`,
  // ...(open && {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // }),
}));

export default function LayoutPrivate({ children }: any) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Header openDrawer={openDrawer} handleDrawerToggle={handleDrawerToggle} />
      <Sidenav
        openDrawer={openDrawer}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Main open={openDrawer}>
        <>
          <Toolbar />
          {children}
        </>
      </Main>
    </>
  );
}
