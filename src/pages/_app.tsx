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
            <title>CodeDrafts - Học lập trình thật dễ</title>
            <meta charSet="utf-8" />
            <link rel="canonical" href="http://codedrafts.com" />
            <meta
              name="description"
              content="CodeDrafts là nền tảng học lập trình hàng đầu cung cấp các khóa học chất lượng cao về lập trình web. Tại CodeDrafts, bạn sẽ tìm thấy những khóa học chuyên sâu về reactjs, nextjs, nodejs, golang và devops, giúp bạn nắm vững từng khía cạnh trong công nghệ này. Hãy tham gia vào các khóa học frontend và backend tại CodeDrafts để trở thành một lập trình viên chuyên nghiệp và sáng tạo những ứng dụng web đẹp và mạnh mẽ.Nắm vững công nghệ mới nhất, xây dựng dự án thực tế, và được hướng dẫn bởi các chuyên gia hàng đầu trong ngành.Với chúng tôi, học lập trình chưa bao giờ dễ dàng và thú vị đến thế!"
            />

            <meta
              name="keywords"
              content="học lập trình, pro lập trình, lập trình, khóa học lập trình, reactjs, nextjs, nodejs, golang, frontend, backend, devops, dạy lập trình, dạy lập trình miễn phí, học lập trình online, học lập trình từ cơ bản đến nâng cao, khóa học lập trình trực tuyến"
            />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="CodeDrafts Team" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>

          <ToastContainer limit={1} />
          <Container>{getLayout(<Component {...pageProps} />)}</Container>
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
