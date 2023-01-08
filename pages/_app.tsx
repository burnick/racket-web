import React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from 'default.theme.json';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorProvider from 'components/ErrorContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ErrorProvider>
            <PersistGate loading={null} persistor={persistor}>
              <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_RECAPTCHA_KEY as string}
                scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
                }}
              >
                <Component {...pageProps} />
              </GoogleReCaptchaProvider>
            </PersistGate>
          </ErrorProvider>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
