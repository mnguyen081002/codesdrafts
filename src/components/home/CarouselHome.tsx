import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { type ListThumbnailResponse, StudentApi } from '@/api/codedrafts-api';

const CarouselHome = () => {
  const [thumbnails, setThumbnails] = useState<ListThumbnailResponse>();

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const data = await StudentApi.getListThumbnail();
        setThumbnails(data.data);
      } catch (error) {
        console.log(error);
        toast.error('Lỗi khi lấy danh sách thumbnail');
      }
    };
    fetchThumbnails();
  }, []);

  return (
    <Carousel maw={2000} w={1500} mx="auto" controlSize={35}>
      {thumbnails?.values.map((thumbnail) => {
        return (
          <Carousel.Slide key={thumbnail}>
            <Image src={thumbnail} alt="Silide1" width={1720} height={400} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};
export default CarouselHome;
