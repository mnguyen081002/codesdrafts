/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';

import { Button, Card, Divider, Flex, Group, Rating, rem, Text } from '@mantine/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swiper from 'swiper';

import { popularCourse } from './mockData';

const CourseCard = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleCardHover = () => {
    setIsHover(true);
  };

  const handleCardLeave = () => {
    setIsHover(false);
  };

  return (
    <div>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        className="group relative flex w-[344px] cursor-pointer flex-col gap-2"
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <Card.Section component="a" className="flex justify-center px-3 pt-[14px]">
          <Image src="/images/home/Thumnail.png" height={212} width={318} alt="Norway" />
        </Card.Section>

        <Group position="right" className="flex flex-row justify-start">
          <Image src="/images/home/Avatar.png" height={35} width={35} alt="Avatar" />
          <Group align="center" position="left" className="flex flex-col items-start gap-0">
            <Text fz="md" fw={700}>
              Minh Nguyên
            </Text>
            <Text size="sm" color="dimmed">
              Google expert
            </Text>
          </Group>
        </Group>

        <Text fw={600} color="dark" className="text-lg leading-5">
          Best Golang Certification Courses For Beginners
        </Text>

        <Group className="relative flex justify-between">
          <Group>
            <Text size="14px" color="dimmed">
              12+ bài học
            </Text>
            <Group className="flex gap-1">
              <Image src="/images/home/clock.svg" height={10} width={10} alt="Clock" />
              <Text size="14px" color="dimmed">
                30.5 giờ
              </Text>
            </Group>
          </Group>
          <Divider
            labelPosition="center"
            sx={(theme) => ({
              color: theme.colors.gray[5],
              position: 'absolute',
              bottom: -5,
            })}
            w={rem(310)}
          />
          <Text size="14px" color="dimmed">
            1000+ học sinh
          </Text>
        </Group>
        <Group className="flex justify-between pt-1">
          <Group className="flex gap-1">
            <Rating fractions={2} value={3.5} />
            <Text size="14px" fw={700}>
              4.5
            </Text>
            <Text size="13px" color="dimmed">
              (350)
            </Text>
          </Group>
          <Text size="15px" fw={700}>
            Miễn phí
          </Text>
        </Group>
        <Button
          className="mt-3 hidden transition-all duration-1000 group-hover:flex"
          variant="outline"
          color="blue"
          w={145}
          h={40}
          radius="md"
          rightIcon={
            <Image src="/images/home/arrow-right.svg" height={20} width={16} alt="Clock" />
          }
        >
          HỌC NGAY
        </Button>
      </Card>
    </div>
  );
};

type SwiperListCardProps = {
  classSwiper: string;
};

function delay(ms) {
  return setTimeout(() => {}, ms);
}

export const SwiperListCard = ({ classSwiper }: SwiperListCardProps) => {
  const [swiper, setSwiper] = useState<any>();

  useEffect(() => {
    const container = document.querySelector(`.${classSwiper}`);
    if (container) {
      const swiper = new Swiper(`.${classSwiper}`, {
        slidesPerView: 4,
        spaceBetween: 20,
        width: 1432,
        allowSlideNext: true,
        allowSlidePrev: true,
        autoplay: {
          delay: 1000,
        },
      });
      if (swiper) {
        console.log(classSwiper, swiper);
        setSwiper(swiper);
      }
    }
  }, [classSwiper]);

  const handlerPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handlerNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };
  return (
    <div>
      <Flex className="relative flex h-[470px] justify-evenly">
        <span>
          <Image
            src="/images/home/previous.svg"
            height={60}
            width={60}
            alt="Previous"
            onClick={handlerPrev}
            className="absolute bottom-64 -left-14 z-10 cursor-pointer"
          />
        </span>
        <div className="swiper">
          <div className="swiper-wrapper">
            {Array(5)
              .fill(null)
              .map((index: number) => (
                <div className="swiper-slide" key={index}>
                  <CourseCard />
                </div>
              ))}
          </div>
        </div>
        <span>
          <Image
            src="/images/home/next.svg"
            height={60}
            width={60}
            alt="Next"
            onClick={handlerNext}
            className="absolute bottom-64 -right-12 z-10 cursor-pointer"
          />
        </span>
      </Flex>
    </div>
  );
};

const listLabel = [
  'Các khóa học Backend phổ biến',
  'Các lộ trình phổ biến',
  'Các khóa học Frontend phổ biến',
  'Các khóa học DevOps phổ biến',
];

const AboutCourse = () => {
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
          <span>
            <Text
              key={item}
              className="mb-[25px] text-3xl font-bold"
              sx={{
                fontSize: '30px',
              }}
            >
              {item}
            </Text>
          </span>
          <div>
            <SwiperListCard classSwiper={`swiper${index}`} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default AboutCourse;
