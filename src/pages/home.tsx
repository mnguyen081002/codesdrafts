import { Container } from '@mantine/core';

import { AboutCourse, CarouselHome, HeaderHome } from '@/components/home';

const Home = () => {
  return (
    <Container fluid mx={60}>
      <HeaderHome />
      <CarouselHome />
      <AboutCourse />
    </Container>
  );
};
export default Home;
