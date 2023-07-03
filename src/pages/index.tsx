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
import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { ListCourse } from '@/components/home/AboutCourse';
import { ChildTopic, topics } from '@/components/landing';
import LandingWrapper from '@/components/landing/landing-wrapper';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';

const Index = () => {
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
      <Header />
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
                <Title className="relative text-6xl text-light-primary" order={1}>
                  Lập Trình
                  <Box
                    sx={(theme) => ({
                      borderRadius: 15,
                      backgroundColor: theme.white,
                      position: 'absolute',
                      zIndex: -2,
                      top: '28px',
                      left: '0',
                    })}
                  >
                    <Image
                      height={40}
                      width={280}
                      alt=""
                      src="/assets/landing-page/title_shape.svg"
                    />
                  </Box>
                </Title>
              </MantineProvider>
              <MantineProvider
                theme={{
                  fontFamily: 'Inter, serif',
                }}
              >
                <Text className="w-2/3 text-[#656565]">
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
      <Container className="flex items-center justify-center gap-24" size="lg" h={960}>
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
            className="w-[90%] font-lexend-deca text-[34px] font-bold tracking-[-.075em]"
            weight={900}
          >
            Tạo Ra
            <span className="relative px-3 text-light-primary">
              Cộng Đồng
              <Box
                sx={(theme) => ({
                  borderRadius: 15,
                  backgroundColor: theme.white,
                  position: 'absolute',
                  zIndex: -2,
                  top: '20px',
                  left: '12px',
                })}
              >
                <Image height={40} width={160} alt="" src="/assets/landing-page/title_shape.svg" />
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
            <EastIcon />
          </Button>
        </Flex>
      </Container>
      <Container size="xxxl" bg="#F6FAFF">
        <MantineProvider
          theme={{
            fontFamily: 'Nunito Sans, sans-serif',
          }}
        >
          <Container className="flex flex-col items-center justify-center gap-20" size="xl" h={960}>
            <Stack>
              <Title className="font-lexend-deca text-[34px] font-bold" order={1}>
                Các
                <span className="relative px-3 text-light-primary">
                  Chủ Đề
                  <Box
                    sx={(theme) => ({
                      borderRadius: 15,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      zIndex: 1,
                      top: '20px',
                      left: '12px',
                    })}
                  >
                    <Image
                      height={40}
                      width={120}
                      alt=""
                      src="/assets/landing-page/title_shape.svg"
                    />
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
      <Container size="xxxl" style={{ borderBottom: '1px solid #797979' }}>
        <Container size="xl" h={960} className="flex flex-col items-center justify-center gap-8">
          <Title className="pb-6 font-lexend-deca text-[40px] font-bold">
            Các
            <span className="relative px-3 text-light-primary">
              Khóa học
              <Box
                sx={(theme) => ({
                  borders: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 1,
                  top: '20px',
                  left: '12px',
                })}
              >
                <Image height={40} width={180} alt="" src="/assets/landing-page/title_shape.svg" />
              </Box>
            </span>
            Phổ Biến
          </Title>
          <ListCourse />
        </Container>
      </Container>
      <Container size="xl" h={960} className="relative flex items-center justify-center">
        <Box>
          <Title className="pb-6 font-lexend-deca text-[40px] font-bold">
            <span className="relative pr-3 text-light-primary">
              Tính Năng
              <Box
                sx={(theme) => ({
                  borders: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 1,
                  top: '20px',
                  left: '12px',
                })}
              >
                <Image height={40} width={140} alt="" src="/assets/landing-page/title_shape.svg" />
              </Box>
            </span>
            Cốt Lõi
          </Title>
          <Box className="flex gap-16">
            <Grid gutter="xl" className="w-[55%] items-end">
              <Grid.Col span={6} className="flex h-[45%] flex-col items-start gap-5">
                <Image
                  height={50}
                  width={50}
                  alt=""
                  src="/assets/landing-page/virtual-reality.svg"
                />
                <Title className="text-[20px]">Lớp học ảo</Title>
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
          <Title className="ml-[77px] w-[360px] font-lexend-deca text-[34px] text-white">
            <span className="relative pr-3 text-white">
              Tham gia
              <Box
                sx={(theme) => ({
                  borders: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 1,
                  top: '20px',
                  left: '12px',
                })}
              >
                <Image height={40} width={140} alt="" src="/assets/landing-page/title_shape.svg" />
              </Box>
            </span>
            & chia sẻ kinh nghiệm
          </Title>
          <Button className="mt-6 mr-[46px] h-14 w-72 bg-white text-black hover:bg-white">
            <span className="mr-2 font-lexend-deca text-base font-bold">TRỞ THÀNH GIẢNG VIÊN</span>
            <EastIcon />
          </Button>
        </Box>
      </Container>
      <Container
        size="xxxl"
        className="bg-blue-400 bg-[url('/assets/landing-page/image16.png')] bg-cover"
      >
        <Container size="xl" h={776} className="flex flex-col items-center justify-center gap-16">
          <Title className="font-lexend-deca text-[40px] font-bold text-white">
            Những
            <span className="relative px-3 text-current">
              Giảng Viên
              <Box
                sx={(theme) => ({
                  borders: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 1,
                  top: '20px',
                  left: '32px',
                })}
              >
                <Image height={40} width={180} alt="" src="/assets/landing-page/title_shape.svg" />
              </Box>
            </span>
            Nổi bật
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
        <Container size="xl" h={960} className="flex flex-col items-center justify-center gap-8">
          <Title className="pb-6 font-lexend-deca text-[40px] font-bold">
            Các
            <span className="relative px-3 text-light-primary">
              Blog
              <Box
                sx={(theme) => ({
                  borders: 15,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 1,
                  top: '20px',
                  left: '12px',
                })}
              >
                <Image height={40} width={80} alt="" src="/assets/landing-page/title_shape.svg" />
              </Box>
            </span>
            Mới Nhất
          </Title>
          <ListCourse />
        </Container>
      </Container>
      <Footer />
    </LandingWrapper>
  );
};

export default Index;
