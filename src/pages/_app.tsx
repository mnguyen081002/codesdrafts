import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import type { AppPropsWithLayout } from '@/types/shared';

import { store } from '../app/store';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
            colors: {
              primary: [
                '#E7EBFD',
                '#BCC7FA',
                '#91A2F7',
                '#667EF4',
                '#3B5AF1',
                '#1136EE',
                '#0D2BBF',
                '#0A208F',
                '#07155F',
                '#030B30',
              ],
            },
            primaryColor: 'primary',
            primaryShade: {
              light: 4,
            },
          }}
        >
          <ToastContainer />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
