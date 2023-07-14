import { useSession } from 'next-auth/react';

import { CarouselHome, HomeMain } from '@/components/home';
import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

import Header from '../layouts/Header';

const Home = () => {
  const session = useSession();
  return (
    <>
      {session.status === 'authenticated' ? <HeaderPrimary /> : <Header />}
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
