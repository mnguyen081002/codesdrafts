import { Button, Divider, Group, Rating, rem, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { ListCourseItemResponse } from '../../api/instructor/course';

interface ShortCourseCardProps {
  course: ListCourseItemResponse;
}

const ShortCourseCard = ({ course }: ShortCourseCardProps) => {
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
      <Link
        href={`/course/${course.id}`}
        className="group relative  flex w-[345px] cursor-pointer flex-col gap-2 rounded-[5px] py-[14px] px-[12px] shadow-md"
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <img src={course.thumbnail} className="h-[212px] w-[318px]" alt="Norway" />
        <div className="flex h-[50px] w-full items-center gap-[9px]">
          <img src={course.owner.avatar} className="h-[35px] w-[35px] rounded-full" alt="Avatar" />
          <div className="flex h-[30px] flex-col justify-between">
            <p className="text-sm font-semibold leading-none tracking-[0.15px] text-[#141414DE]">
              {course.owner.username}
            </p>
            <p className="text-[13px] font-normal leading-none tracking-[0.15px] text-[#4C4E64AD]">
              Google expert
            </p>
          </div>
        </div>

        <Text fw={600} color="dark" className="text-lg leading-5">
          {course.name}
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
            {course.total_enrollment} học sinh
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
          <Text size="18px" fw={700}>
            {course.price === 0
              ? 'Miễn phí'
              : `${course?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`}
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
      </Link>
    </swiper-slide>
  );
};

export default ShortCourseCard;
