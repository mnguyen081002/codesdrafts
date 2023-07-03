import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  MantineProvider,
  Rating,
  rem,
  Text,
} from '@mantine/core';
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
    <Grid.Col span={3} h={470}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="group relative cursor-pointer"
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
        w={350}
      >
        <Card.Section component="a" className="flex justify-center px-4 pt-4">
          <Image
            src="/images/home/Thumnail.png"
            className="h-full w-full object-contain"
            height={200}
            width={360}
            alt="Norway"
          />
        </Card.Section>

        <Group position="right" mt="md" mb="xs" className="flex flex-row justify-start">
          <Image src="/images/home/Avatar.png" height={35} width={35} alt="Avatar" />
          <Group align="center" position="left" className="flex flex-col items-start gap-0">
            <Text fz="md">Minh Nguyên</Text>
            <Text size="sm" color="dimmed">
              Google expert
            </Text>
          </Group>
        </Group>

        <Text fw={600} color="dark" className="text-lg">
          Best Golang Certification Courses For Beginners
        </Text>

        <Group className="relative my-6 flex justify-between">
          <Group>
            <Text size="12px" color="dimmed">
              12+ bài học
            </Text>
            <Group className="flex gap-1">
              <Image src="/images/home/clock.svg" height={10} width={10} alt="Clock" />
              <Text size="12px" color="dimmed">
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
            w={rem(360)}
          />
          <Text size="12px" color="dimmed">
            1000+ học sinh
          </Text>
        </Group>
        <Group className="flex justify-between">
          <Group className="flex gap-1">
            <Rating fractions={2} value={3.5} />
            <Text size="10px" fw={700}>
              4.5
            </Text>
            <Text size="10px" color="dimmed">
              (350)
            </Text>
          </Group>
          <Text size="16px" fw={700}>
            Miễn phí
          </Text>
        </Group>
        <Button
          className={`hidden transition-all duration-1000 group-hover:flex ${
            !isHover ? 'opacity-0' : 'opacity-100'
          }`}
          variant="outline"
          color="blue"
          w={145}
          h={40}
          mt="md"
          radius="md"
          rightIcon={
            <Image src="/images/home/arrow-right.svg" height={20} width={16} alt="Clock" />
          }
        >
          HỌC NGAY
        </Button>
      </Card>
    </Grid.Col>
  );
};

export const ListCourse = () => {
  return (
    <Grid gutter="lg">
      {Array(4)
        .fill(null)
        .map((index: number) => (
          <CourseCard key={index} />
        ))}
    </Grid>
  );
};

const AboutCourse = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Container fluid mx={15}>
        <Group position="left">
          <h3 className="relative flex w-screen text-2xl">
            <Image
              className="absolute left-11 -bottom-5"
              src="/images/home/title_shape.svg"
              height={40}
              width={80}
              alt="Title_image"
            />
            Các
            <Text
              sx={{
                color: '#1363DF',
              }}
            >
              &nbsp;chủ đề&nbsp;
            </Text>
            phổ biến
          </h3>
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
      </Container>
    </MantineProvider>
  );
};
export default AboutCourse;
