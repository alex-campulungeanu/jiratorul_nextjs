import '../styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '@/theme'

import {queryClient} from '@/lib/queryClient'
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthGuard } from '@/components/auth/AuthGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JIRATORUL</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          // withGlobalStyles
          withNormalizeCSS
          theme={theme}
        >
          <AuthProvider>
            {
              pageProps.protected == true ?
              (
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
              )
              : 
              <Component {...pageProps} />
            }
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        // pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );

}

export default MyApp
