import '../styles/global.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import SnackbarProvider from '../components/snackbar';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <SnackbarProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SnackbarProvider>
  </SessionProvider>
);

export default MyApp;
