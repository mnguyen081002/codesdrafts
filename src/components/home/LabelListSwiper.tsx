import { Box, Title } from '@mantine/core';
import React, { useEffect } from 'react';

import { CodedraftsApi } from '../../api/codedrafts-api';
import type { ListCourseItemResponse } from '../../api/instructor/course';
import SwiperListCard from './SwiperListCard';

type PropsLabelCourse = {
  courseName: string;
};

export const HightLightLabelCourse = ({ courseName }: PropsLabelCourse) => {
  return (
    <Title
      className="group z-10 w-fit font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
      weight={900}
    >
      {courseName === 'Lộ trình' || courseName === 'chủ đề' ? 'Các' : 'Các khóa học'}
      <span className="relative w-full px-3 text-light-primary">
        {courseName}
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: -2,
            bottom: '-8px',
            left: '0px',
          })}
          className="overflow-hidden object-contain group-hover:animate-co-fast"
        >
          <img alt="" src="/assets/landing-page/co3.svg" />
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: -2,
            bottom: '-9px',
            left: '24px',
          })}
          className="overflow-hidden object-contain group-hover:animate-co-slow"
        >
          <img alt="" src="/assets/landing-page/co4.svg" />
        </Box>
      </span>
      phổ biến
    </Title>
  );
};

const LabelListSwiper = () => {
  const [courseList, setCourseList] = React.useState<ListCourseItemResponse[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const r = await CodedraftsApi.getCourseList({});
        setCourseList(r.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div>
        <HightLightLabelCourse courseName="Backend" />

        <SwiperListCard courses={courseList} classSwiper="swiper-container-Backend" />
      </div>
      <div>
        <HightLightLabelCourse courseName="Lộ trình" />
        <SwiperListCard courses={courseList} classSwiper="swiper-container-2" />
      </div>
      <div>
        <HightLightLabelCourse courseName="Frontend" />
        <SwiperListCard courses={courseList} classSwiper="swiper-container-Frontend" />
      </div>
      <div>
        <HightLightLabelCourse courseName="DevOps" />
        <SwiperListCard courses={courseList} classSwiper="swiper-container-DevOps" />
      </div>
    </div>
  );
};
export default LabelListSwiper;
