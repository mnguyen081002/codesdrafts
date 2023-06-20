import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Title,
} from '@mantine/core';
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ChildTopic, topics } from '@/components/landing';
import LandingWrapper from '@/components/landing/landing-wrapper';

const Index = () => {
  const session = useSession();
  console.log(session.data?.expires);
  return (
    <LandingWrapper>
      {/* <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      > 
      <ProtectedPage>
        <Teach />
      </Main>  */}

      <Container size="xxl" className="z-20" h={90}>
        <Flex justify="space-between" align="center" w="100%" h="100%">
          <Group>
            <Flex justify="center">
              <Link href="/">
                <Image src="/logo-96.png" width={40} height={40} alt="" />
              </Link>
            </Flex>
            <Group className="text-dark-90">
              <Button className="text-lg font-bold" color="dark" variant="white">
                Trang chủ
              </Button>
              <Button className="text-lg font-bold" color="dark" variant="white">
                Blog
              </Button>
              <Button className="text-lg font-bold" color="dark" variant="white">
                Liên hệ
              </Button>
            </Group>
          </Group>
          <Group spacing="xs">
            <Button className="text-lg" color="dark" variant="white">
              Tiếng Việt <KeyboardArrowDownIcon className="text-gray-500" />
            </Button>
            <Button
              className="relative text-lg text-light-primary after:absolute after:left-1/2 after:block after:h-[2px] after:w-8 after:-translate-x-1/2 after:rounded-md after:bg-light-primary after:content-['']"
              variant="white"
              color="dark"
            >
              <Link href="/login" className="">
                Đăng nhập
              </Link>
            </Button>
            <Button
              className="rounded-2xl bg-light-primary text-lg shadow-forfun transition-all hover:bg-light-tertiary"
              variant="filled"
            >
              Đăng ký
            </Button>
          </Group>
        </Flex>
      </Container>
      <Container size="xxxl" p={0} h={840}>
        <Flex className="items-stretch" h="100%" justify="space-between">
          <Flex className="h-1/2 w-[40%] justify-end self-center">
            <Stack spacing="xs" className="leading-6">
              <MantineProvider
                theme={{
                  fontFamily: 'Newsreader, serif',
                }}
              >
                <Title className="text-6xl" order={1}>
                  Khám Phá Thế Giới
                </Title>
                <Title className="text-6xl text-light-primary" order={1}>
                  Lập Trình
                </Title>
              </MantineProvider>
              <Button className="mt-10 h-12 w-48 bg-light-primary shadow-forfun transition-all hover:bg-light-tertiary">
                <span className="mr-2 text-base">Bắt đầu ngay</span>
                <EastIcon />
              </Button>
            </Stack>
          </Flex>
          <Box className="h-[full] items-center justify-center self-end">
            <Image
              className="h-[760px] w-full"
              src="/assets/landing-page/PersonFrame.png"
              width={720}
              height={720}
              alt=""
            />
          </Box>
        </Flex>
      </Container>
      <MantineProvider
        theme={{
          fontFamily: 'Nunito Sans, sans-serif',
        }}
      >
        <Container className="flex flex-col items-center justify-center gap-8" size="xl" h={960}>
          <Stack>
            <Title align="center" transform="uppercase" order={4} className="text-light-primary">
              Danh mục khóa học
            </Title>
            <Title className="text-5xl" order={1}>
              Các chủ đề phổ biến
            </Title>
          </Stack>
          <Grid w="100%" gutter="lg">
            {topics.map((topic) => (
              <Grid.Col key={topic.title} span={3}>
                <ChildTopic topic={topic} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </MantineProvider>
    </LandingWrapper>
  );
};

export default Index;
