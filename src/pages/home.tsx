import { Container } from '@mantine/core';

import CarouselHome from '@/components/home/CarouselHome';
import HeaderHome from '@/components/home/Header';

const Home = () => {
  return (
    <Container fluid mx={60}>
      <HeaderHome />
      <CarouselHome />
    </Container>
  );
};
export default Home;
