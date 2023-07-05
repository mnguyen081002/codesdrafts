/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';

import { Button, Group, Text } from '@mantine/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import { popularCourse } from './mockData';
import SwiperListCard from './SwiperListCard';
// register Swiper custom elements
register();

function delay(ms) {
  return setTimeout(() => {}, ms);
}

const listLabel = [
  'Các khóa học Backend phổ biến',
  'Các lộ trình phổ biến',
  'Các khóa học Frontend phổ biến',
  'Các khóa học DevOps phổ biến',
];

const HomeMain = () => {
  return (
    <div className="w-full">
      <Group position="left">
        <h3 className="mt-4 mb-[25px] w-screen text-3xl font-bold">Các chủ đề phổ biến</h3>
      </Group>
      {popularCourse.map((item) => (
        <Button
          w={188}
          h={60}
          variant="default"
          key={item.key}
          sx={{
            fontSize: '20px',
          }}
          className="ml-[20px] mb-[40px]"
        >
          {item.name}
        </Button>
      ))}
      {listLabel.map((item, index) => (
        <div key={item}>
          <Text
            key={item}
            className="mb-[10px] text-3xl font-bold"
            sx={{
              fontSize: '30px',
            }}
          >
            {item}
          </Text>
          <SwiperListCard classSwiper={`swiper-container-${index}`} />
        </div>
      ))}
    </div>
  );
};
export default HomeMain;
