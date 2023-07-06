import type { GetServerSideProps } from 'next';

import { CarouselHome, HomeMain } from '@/components/home';
import HeaderPrimary from '@/components/home/HeaderPrimary';
import { requireAuth } from '@/components/requireAuth';
import Footer from '@/layouts/Footer';

const Home = () => {
  return (
    <div>
      <HeaderPrimary />
      <div className=" mx-[180px] mt-[12px] flex flex-col items-center justify-center">
        <CarouselHome />
        <HomeMain />
      </div>
      <Footer />
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
