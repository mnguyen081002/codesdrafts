import type { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

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
      {session ? <HeaderPrimary /> : <Header />}
      <div className="mt-[12px] flex flex-col items-center justify-center gap-7">
        <CarouselHome />
        <HomeMain />
      </div>
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
