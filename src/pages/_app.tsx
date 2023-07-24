import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { MantineProvider, Overlay } from '@mantine/core';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

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
          <Head>
            <title> CodeDrafts - Học lập trình thật dễ</title>
            <meta charSet="utf-8" />
            <link rel="canonical" href="http://codedrafts.com" />
            <meta
              name="description"
              content="Website CodeDrafts cung cấp các khóa học lập trình chuyên nghiệp và hữu ích về reactjs, nextjs, nodejs, golang, frontend, backend, và devops."
            />

            <meta
              name="keywords"
              content="học lập trình, pro lập trình, lập trình, khóa học lập trình, reactjs, nextjs, nodejs, golang, frontend, backend, devops"
            />
            <meta
              name="keywords"
              content="dạy lập trình, học lập trình, dạy lập trình miễn phí, học lập trình miễn phí, học lập trình online, học lập trình từ cơ bản đến nâng cao, khóa học lập trình, học lập trình trực tuyến"
            />
            <meta name="robots" content="index, follow" />
          </Head>
          <ToastContainer limit={1} />
          <Container>{getLayout(<Component {...pageProps} />)}</Container>
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
