import { createTheme } from '@mui/material';
import {
  Components,
  PaletteOptions,
  responsiveFontSizes,
} from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const sideNavWidth = 260;

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#f5f5f1',
  },
  secondary: {
    main: '#e50914',
  },
  text: {
    primary: '#f5f5f1',
  },
};

const components: Components = {
  MuiDrawer: {
    styleOverrides: {
      root: {
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sideNavWidth },
        '& .MuiButtonBase-root': { color: 'white' },
      },
      paper: {
        // backgroundColor: '#1E293B',
        // color: 'white',
        padding: '1rem',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      containedError: {
        color: '#fff',
      },
    } as any,
  },
};

const typography: TypographyOptions = {
  fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
};

const appTheme = responsiveFontSizes(
  createTheme({
    components,
    palette,
    typography,
  }),
);

export default appTheme;
