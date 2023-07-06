/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';

import { Button, Group } from '@mantine/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import LabelListSwiper, { HightLightLabelCourse } from './LabelListSwiper';
import { popularCourse } from './mockData';
// register Swiper custom elements
register();

const HomeMain = () => {
  return (
    <div className="w-full">
      <Group position="left" className="my-4">
        <HightLightLabelCourse courseName="chủ đề" />
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
      <LabelListSwiper />
    </div>
  );
};
export default HomeMain;
