import { CacheProvider, EmotionCache } from '@emotion/react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import appTheme from '@config/theme';
import { store } from '@store/index';
import createEmotionCache from '@utils/create-emotion-cache';

export type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

type MyAppPropsWithLayout = AppProps<SessionProviderProps> & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={appTheme}>
            <Box
              component="main"
              sx={{
                height: '100vh',
                backgroundColor: (theme) => theme.palette.grey[900],
              }}
            >
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={4000}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <NextNProgress color="red" />
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </SnackbarProvider>
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
