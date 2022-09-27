import { Box, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '@app/store';
import { Header } from '@components/Header';
import { Layout } from '@components/Layout';
import { appTheme } from '@config/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Box
          component="main"
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
