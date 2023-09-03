import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { MantineProvider, Overlay } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { register } from 'swiper/element/bundle';

import type { AppPropsWithLayout } from '@/types/shared';

import { useAppSelector } from '../app/hooks';
import { store } from '../app/store';
import { selectLoading } from '../features/auth/appSlice';

const Container = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector(selectLoading);

  return (
    <>
      {isLoading && <Overlay zIndex={40} color="#000" opacity={0.5} />}
      {children}
    </>
  );
};
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  register();

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
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <ToastContainer limit={1} />
          <Container>{getLayout(<Component {...pageProps} />)}</Container>
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
