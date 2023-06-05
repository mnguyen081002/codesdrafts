import { Button, Container, Flex, Group, MantineProvider, Stack, Title } from '@mantine/core';
import EastIcon from '@mui/icons-material/East';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import LandingWrapper from '@/components/landing/landing-wrapper';

const Index = () => {
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
        <Teach />
      </Main> */}

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
            >
              Đăng nhập
            </Button>
            <Button className="rounded-3xl bg-light-primary text-lg" variant="filled">
              Đăng ký
            </Button>
          </Group>
        </Flex>
      </Container>
      <Container size="xxxl" p={0} h={839}>
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
              <Button className="mt-10 h-12 w-48 bg-light-primary">
                <span className="mr-2">Bắt đầu ngay</span>
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
    </LandingWrapper>
  );
};

export default Index;
