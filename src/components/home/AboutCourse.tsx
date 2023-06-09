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

const AboutCourse = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };
  const cards = [1, 2, 3, 4].map((index) => (
    <Grid.Col key={index} span={3}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="group relative cursor-pointer"
        onMouseEnter={() => handleCardHover(index)}
        onMouseLeave={handleCardLeave}
      >
        <Card.Section component="a" w="100%" p={15}>
          <Image src="/images/home/Thumnail.png" height={200} width={360} alt="Norway" />
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
            hoveredCard !== index ? 'opacity-0' : 'opacity-100'
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
  ));

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
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
          <Grid gutter="lg" mb={40}>
            {cards}
          </Grid>
        </Group>
        <Image
          src="/images/home/add-course.svg"
          className="absolute -bottom-72 left-6 cursor-pointer"
          height={69}
          width={69}
          alt="Add course"
        />
      </Container>
    </MantineProvider>
  );
};
export default AboutCourse;
