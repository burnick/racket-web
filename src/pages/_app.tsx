import React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import theme from 'default.theme.json';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { persistor, store } from 'src/store';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorProvider from 'components/MessageNotificationContext';
import MainLayoutPage from 'components/MainLayoutPage';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { JobsAPI } from 'src/store/store';
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

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ApiProvider api={JobsAPI}>
          <Provider store={store}>
            <ErrorProvider>
              <PersistGate loading={null} persistor={persistor}>
                <Hydrate state={pageProps.dehydratedState}>
                  <MainLayoutPage>
                    <Component {...pageProps} />
                  </MainLayoutPage>
                </Hydrate>
              </PersistGate>
            </ErrorProvider>
          </Provider>
        </ApiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
