import { Container, Divider } from '@mantine/core';

import { AboutCourse, CarouselHome, HeaderHome } from '@/components/home';

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <Divider className="mb-3" />
      <Container fluid mx={202}>
        <CarouselHome />
        <AboutCourse />
      </Container>
    </div>
  );
};
export default Home;
