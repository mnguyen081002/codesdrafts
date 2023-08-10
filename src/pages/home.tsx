import type { NextPageContext } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import Facebook from '@/components/Facebook/Facebook';
import { CarouselHome, HomeMain } from '@/components/home';
import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

import Header from '../layouts/Header';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}

const Home = ({ session }) => {
  return (
    <>
      <Head>
        <title>CodeDrafts - Học lập trình thật dễ</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href="home" />
        <meta
          name="description"
          content="CodeDrafts là nền tảng học lập trình hàng đầu cung cấp các khóa học chất lượng cao về lập trình web. Tại CodeDrafts, bạn sẽ tìm thấy những khóa học chuyên sâu về reactjs, nextjs, nodejs, golang và devops, giúp bạn nắm vững từng khía cạnh trong công nghệ này. Hãy tham gia vào các khóa học frontend và backend tại CodeDrafts để trở thành một lập trình viên chuyên nghiệp và sáng tạo những ứng dụng web đẹp và mạnh mẽ. Nắm vững công nghệ mới nhất, xây dựng dự án thực tế, và được hướng dẫn bởi các chuyên gia hàng đầu trong ngành. Với chúng tôi, học lập trình chưa bao giờ dễ dàng và thú vị đến thế!"
        />

        <meta
          name="keywords"
          content="Codedrafts, Code Drafts, codedraft, code drafts, học lập trình, pro lập trình, lập trình, khóa học lập trình, reactjs, nextjs, nodejs, golang, frontend, backend, devops, dạy lập trình, dạy lập trình miễn phí, học lập trình online, học lập trình từ cơ bản đến nâng cao, khóa học lập trình trực tuyến"
        />
        <meta property="og:title" content="CodeDrafts" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CodeDrafts Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {session ? <HeaderPrimary /> : <Header />}

      <div className="mt-[12px] flex flex-col items-center justify-center gap-7">
        <CarouselHome />
        <HomeMain />
      </div>
      <Facebook />
      <Footer />
    </>
  );
};
export default Home;

// export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
//   return {
//     props: {},
//   };
// });
