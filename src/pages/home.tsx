import type { GetServerSideProps } from 'next';

import { CarouselHome, HomeMain } from '@/components/home';
import { requireAuth } from '@/components/requireAuth';
import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <HeaderPrimary />
      <div className="mt-[12px] flex flex-col items-center justify-center gap-7">
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
