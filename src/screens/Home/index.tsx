import { Container, Divider } from '@mantine/core';

import { AboutCourse, CarouselHome } from '@/components/home';
import HeaderPrimary from '@/components/home/HeaderPrimary';

const Home = () => {
  return (
    <div>
      <HeaderPrimary />
      <Divider className="mb-3" />
      <Container fluid mx={202}>
        <CarouselHome />
        <AboutCourse />
      </Container>
    </div>
  );
};
export default Home;
