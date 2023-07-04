import { Button, Card, Container, Divider, Flex, Group, Rating, rem, Text } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

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
          className={`mt-3 hidden transition-all duration-1000 group-hover:flex ${
            !isHover ? 'opacity-0' : 'opacity-100'
          }`}
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

export const ListCourse = () => {
  return (
    <Flex className="flex h-[470px] w-[1483px] justify-evenly">
      {Array(4)
        .fill(null)
        .map((index: number) => (
          <CourseCard key={index} />
        ))}
    </Flex>
  );
};

const AboutCourse = () => {
  return (
    <Container fluid mx={15}>
      <Group position="left">
        <h3 className="w-screen text-2xl">Các chủ đề phổ biến</h3>
      </Group>
      <Group position="left">
        {popularCourse.map((item) => (
          <Button
            w={200}
            h={60}
            variant="default"
            key={item.key}
            sx={{
              fontSize: '20px',
            }}
          >
            {item.name}
          </Button>
        ))}
      </Group>

      <Group position="left">
        <h3 className="w-screen text-2xl">Các khóa học phổ biến</h3>
        <ListCourse />
      </Group>
      <Image
        src="/images/home/add-course.svg"
        className="absolute -bottom-72 left-6 cursor-pointer"
        height={69}
        width={69}
        alt="Add course"
      />
    </Container>
  );
};
export default AboutCourse;
