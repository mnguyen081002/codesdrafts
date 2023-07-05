import { Button, Divider, Group, Rating, rem, Text } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

const ShortCourseCard = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleCardHover = () => {
    setIsHover(true);
  };

  const handleCardLeave = () => {
    setIsHover(false);
  };

  return (
    <swiper-slide
      style={{
        padding: '20px 10px',
      }}
    >
      <div
        className="group relative flex w-[344px] cursor-pointer flex-col gap-2 rounded-[5px] py-[14px] px-[12px] shadow-md"
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <img src="/images/home/Thumnail.png" className="h-[212px] w-[318px]" alt="Norway" />
        <div className="flex h-[50px] w-full items-center gap-[9px]">
          <img src="/images/home/Avatar.png" className="h-[35px] w-[35px]" alt="Avatar" />
          <div className="flex h-[30px] flex-col justify-between">
            <p className="text-sm font-semibold leading-none tracking-[0.15px] text-[#141414DE]">
              Minh Nguyên
            </p>
            <p className="text-[13px] font-normal leading-none tracking-[0.15px] text-[#4C4E64AD]">
              Google expert
            </p>
          </div>
        </div>

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
            <p className="text-sm font-semibold text-[#353535]">4.5</p>
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
      </div>
    </swiper-slide>
  );
};

export default ShortCourseCard;
