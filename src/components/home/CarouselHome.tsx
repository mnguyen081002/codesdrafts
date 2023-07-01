import { Carousel } from '@mantine/carousel';
import Image from 'next/image';

const CarouselHome = () => {
  return (
    <Carousel maw={2000} mx="auto" controlSize={35}>
      <Carousel.Slide>
        <Image src="/images/home/Slide1.png" alt="Silide1" width={1720} height={400} />
      </Carousel.Slide>
    </Carousel>
  );
};
export default CarouselHome;
