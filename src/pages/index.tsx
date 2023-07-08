import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  MantineProvider,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { East as EastIcon } from '@mui/icons-material';
import type { NextPageContext } from 'next';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';

// import { SwiperListCard } from '@/components/home/SwiperListCard';
import { ChildTopic, topics } from '@/components/landing';
import LandingWrapper from '@/components/landing/landing-wrapper';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import { PATH_DASHBOARD } from '@/routes/path';

import SwiperListCard from '../components/home/SwiperListCard';

const LandingPage = () => {
  const session = useSession();
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
      <Container size="xxxl" className="bg-[#F3F4F8]">
        <Header />
      </Container>
      <Container size="xxxl" p={0} h={840} bg="#F3F4F8" className="z-10">
        <Flex className="items-stretch" h="100%" justify="space-between">
          <Flex className="h-1/2 w-[46%] justify-end self-center">
            <Stack spacing="xs" className="leading-6">
              <MantineProvider
                theme={{
                  fontFamily: 'Newsreader, serif',
                }}
              >
                <Title className="text-6xl" order={1}>
                  Khám Phá Thế Giới
                </Title>
                <Title className="group relative z-10 w-fit text-6xl text-light-primary" order={1}>
                  Lập Trình
                  <Box
                    sx={(theme) => ({
                      borderRadius: 15,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      zIndex: -2,
                      top: '28px',
                      left: '0',
                    })}
                    className="overflow-hidden object-contain group-hover:animate-co-fast"
                  >
                    <img alt="" src="/assets/landing-page/co1.svg" />
                  </Box>
                  <Box
                    sx={(theme) => ({
                      borderRadius: 15,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      zIndex: -2,
                      top: '32px',
                      left: '48px',
                    })}
                    className="overflow-hidden object-contain group-hover:animate-co-slow"
                  >
                    <img alt="" src="/assets/landing-page/co2.svg" />
                  </Box>
                </Title>
              </MantineProvider>
              <MantineProvider
                theme={{
                  fontFamily: 'Inter, serif',
                }}
              >
                <Text className="z-10 w-2/3 text-[#656565]">
                  Khám phá hơn 600 khóa học về: Lập trình | Điện toán đám mây | Khoa học dữ liệu |
                  Học máy
                </Text>
              </MantineProvider>
              <Button className="mt-6 h-12 w-48 bg-light-primary shadow-forfun transition-all hover:bg-light-tertiary">
                <span className="mr-2 text-base">Bắt đầu ngay</span>
                <EastIcon />
              </Button>
            </Stack>
          </Flex>
          <Box className="h-[full] items-center justify-center self-end">
            <img src="/assets/landing-page/person.svg" alt="" />
          </Box>
        </Flex>
      </Container>
      <Container className="flex items-center justify-center gap-24" size="lg" h={800}>
        <Flex w="50%" className="flex justify-end">
          <Flex className="flex flex-col items-center gap-7">
            <Flex className="flex items-end gap-7">
              <Box className="h-[200px] w-[180px] rounded-[5px] bg-[#F9D2FF]"></Box>
              <Box className="h-[250px] w-[250px] rounded-[5px] bg-[#FFD79A]"></Box>
            </Flex>
            <Box className="h-[200px] w-[400px] rounded-[5px] bg-[#AFD9FF]"></Box>
          </Flex>
        </Flex>
        <Flex direction="column" gap={32} w="50%">
          <Title
            className="group w-fit font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
            weight={900}
          >
            Tạo Ra
            <span className="relative w-full px-3 text-light-primary">
              Cộng Đồng
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '18px',
                  left: '24px',
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
                  top: '21px',
                  left: '48px',
                })}
                className="overflow-hidden object-contain group-hover:animate-co-slow"
              >
                <img alt="" src="/assets/landing-page/co4.svg" />
              </Box>
            </span>
            Những Người Tự Học
          </Title>
          <Text className="text-[16px] text-[#646464]">
            Học tập từ một khóa trực tuyến bao gồm một số bước chính. Đầu tiên, điều quan trọng là
            phải nghiên cứu và chọn một sự kiện phù hợp với mục tiêu và sở thích học tập của bạn.
            Sau khi bạn đã đăng ký tham gia sự kiện, hãy đảm bảo xem lại chương trình làm việc và
            lịch trình để lên kế hoạch cho thời gian của bạn một cách hiệu quả.
          </Text>
          <Grid>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Grid.Col key={index} span={6} className="flex items-center justify-start gap-2">
                  <Image height={16} width={16} alt="" src="/assets/landing-page/Correct.svg" />{' '}
                  <Text className="text-[14px] font-bold">Chương trình đào tạo linh hoạt</Text>
                </Grid.Col>
              ))}
          </Grid>
          <Button className="mt-6 h-12 w-48 bg-light-primary shadow-forfun transition-all hover:bg-light-tertiary">
            <span className="mr-2 text-base">Về chúng tôi</span>
            {/* <EastIcon /> */}
          </Button>
        </Flex>
      </Container>
      <Container size="xxxl" bg="#F6FAFF">
        <MantineProvider
          theme={{
            fontFamily: 'Nunito Sans, sans-serif',
          }}
        >
          <Container className="flex flex-col items-center justify-center gap-20" size="xl" h={860}>
            <Stack>
              <Title
                className="group z-10 w-fit font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
                weight={900}
              >
                Các
                <span className="relative w-full px-3 text-light-primary">
                  Chủ Đề
                  <Box
                    sx={(theme) => ({
                      borderRadius: 15,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      zIndex: -2,
                      top: '18px',
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
                      top: '21px',
                      left: '24px',
                    })}
                    className="overflow-hidden object-contain group-hover:animate-co-slow"
                  >
                    <img alt="" src="/assets/landing-page/co4.svg" />
                  </Box>
                </span>
                Phổ Biến
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
      </Container>
      <Container
        size="xxl"
        h={738}
        className="flex flex-col items-center justify-center gap-8"
        style={{ borderBottom: '1px solid #E9E9E9' }}
      >
        <Title
          className="group w-fit font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
          weight={900}
        >
          Các
          <span className="relative w-full px-3 text-light-primary">
            Khóa Học
            <Box
              sx={(theme) => ({
                borderRadius: 15,
                backgroundColor: 'transparent',
                position: 'absolute',
                zIndex: -2,
                top: '18px',
                left: '12px',
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
                top: '21px',
                left: '36px',
              })}
              className="overflow-hidden object-contain group-hover:animate-co-slow"
            >
              <img alt="" src="/assets/landing-page/co4.svg" />
            </Box>
          </span>
          Phổ Biến
        </Title>
        <SwiperListCard classSwiper="swiper1" />
        <Button className="h-14 w-[320px] bg-light-tertiary transition-all hover:bg-light-tertiary">
          <span className="mr-2 text-base">Khám Phá Tất Cả Khóa Học</span>
          {/* <EastIcon /> */}
        </Button>
      </Container>
      <Container size="xl" h={895} className="relative flex items-center justify-center">
        <Box>
          <Title
            className="group w-fit font-lexend-deca text-[40px] font-bold tracking-[-.075em]"
            weight={900}
          >
            <span className="relative w-full pr-3 text-light-primary">
              Tính Năng
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '18px',
                  left: '16px',
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
                  top: '21px',
                  left: '40px',
                })}
                className="overflow-hidden object-contain group-hover:animate-co-slow"
              >
                <img alt="" src="/assets/landing-page/co4.svg" />
              </Box>
            </span>
            Cốt Lõi
          </Title>
          <Box className="flex gap-16">
            <Grid className="flex-1 items-end">
              <Grid.Col span={6} className="flex h-[45%] flex-col items-start gap-5">
                <Image
                  height={50}
                  width={50}
                  alt=""
                  src="/assets/landing-page/virtual-reality.svg"
                />
                <Title className="pb-7 text-[20px]">Lớp học ảo</Title>
                <Text className="text-[#545454]">
                  Học sinh có thể truy cập tài liệu khóa học, tham gia tranh luận và thảo luận.
                </Text>
              </Grid.Col>
              <Grid.Col span={6} className="flex h-[45%] flex-col items-start gap-5">
                <Image height={50} width={50} alt="" src="/assets/landing-page/code.svg" />
                <Title className="text-[20px]">Chạy các ứng dụng trực tiếp trong trình duyệt</Title>
                <Text className="text-[#545454]">
                  Học sinh có thể truy cập tài liệu khóa học, tham gia tranh luận và thảo luận.
                </Text>
              </Grid.Col>
              <Grid.Col span={6} className="flex h-[45%] flex-col items-start gap-5">
                <Image height={50} width={50} alt="" src="/assets/landing-page/laptop.svg" />
                <Title className="text-[20px]">Học trực tuyến</Title>
                <Text className="text-[#545454]">
                  Học tập trực tuyến cho phép trải nghiệm học tập được cá nhân hóa và linh hoạt hơn.
                </Text>
              </Grid.Col>
              <Grid.Col span={6} className="flex h-[45%] flex-col items-start gap-5">
                <Image height={50} width={50} alt="" src="/assets/landing-page/support.svg" />
                <Title className="text-[20px]">Hỗ trợ người học</Title>
                <Text className="text-[#545454]">
                  Nâng cao kiến thức và kỹ năng của họ thông qua giải đáp câu hỏi, cung cấp phản hồi
                  và gợi ý, và tạo ra môi trường học tập tương tác và thú vị.
                </Text>
              </Grid.Col>
            </Grid>
            <Box className="h-[500px] w-[500px] bg-black"></Box>
          </Box>
        </Box>
        <Box className="absolute bottom-[-90px] left-1/2 flex h-[180px] w-[1082px] -translate-x-1/2 items-center justify-between rounded-lg bg-[url('/assets/landing-page/image15.png')] bg-cover">
          <Title
            className="group ml-[77px] w-[360px] font-lexend-deca text-[34px] font-bold tracking-[-.075em] text-white"
            weight={900}
          >
            <span className="relative w-full pr-3 text-white">
              Tham gia
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '18px',
                  left: '2px',
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
                  top: '21px',
                  left: '26px',
                })}
                className="overflow-hidden object-contain group-hover:animate-co-slow"
              >
                <img alt="" src="/assets/landing-page/co4.svg" />
              </Box>
            </span>
            & chia sẻ kinh nghiệm
          </Title>
          <Button className="mt-6 mr-[46px] h-14 w-72 bg-white text-black hover:bg-white">
            <span className="mr-2 font-lexend-deca text-base font-bold">TRỞ THÀNH GIẢNG VIÊN</span>
            {/* <EastIcon /> */}
          </Button>
        </Box>
      </Container>
      <Container
        size="xxxl"
        className="bg-blue-400 bg-[url('/assets/landing-page/image16.png')] bg-cover"
      >
        <Container size="xl" h={774} className="flex flex-col items-center justify-center gap-16">
          <Title
            className="group z-10 w-fit font-lexend-deca text-[40px] font-bold tracking-[-.075em] text-white"
            weight={900}
          >
            Những
            <span className="relative w-full px-3 text-white">
              Giảng Viên
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '18px',
                  left: '36px',
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
                  top: '21px',
                  left: '60px',
                })}
                className="overflow-hidden object-contain group-hover:animate-co-slow"
              >
                <img alt="" src="/assets/landing-page/co4.svg" />
              </Box>
            </span>
            Nổi Bật
          </Title>
          <Flex gap={32}>
            <Image height={330} width={250} src="/assets/landing-page/lecture.png" alt="Lecture" />
            <Image height={330} width={250} src="/assets/landing-page/lecture.png" alt="Lecture" />
            <Image height={330} width={250} src="/assets/landing-page/lecture.png" alt="Lecture" />
            <Image height={330} width={250} src="/assets/landing-page/lecture.png" alt="Lecture" />
          </Flex>
        </Container>
      </Container>
      <Container size="xxxl">
        <Container size="xl" h={676} className="flex flex-col items-center justify-center gap-8">
          <Title
            className="group z-10 w-fit font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
            weight={900}
          >
            Các
            <span className="relative w-full px-3 text-light-primary">
              Blog
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '18px',
                  left: '-20px',
                })}
                className="overflow-hidden object-contain"
              >
                <img alt="" src="/assets/landing-page/co3.svg" />
              </Box>
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: -2,
                  top: '21px',
                  left: '4px',
                })}
                className="overflow-hidden object-contain"
              >
                <img alt="" src="/assets/landing-page/co4.svg" />
              </Box>
            </span>
            Phổ Biến
          </Title>
          <SwiperListCard classSwiper="swiper2" />
        </Container>
      </Container>
      <Footer />
    </LandingWrapper>
  );
};

export default LandingPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_DASHBOARD.home,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}
