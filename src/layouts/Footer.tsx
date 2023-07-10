import { Box, Container, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container className="w-full" size="xxxl" bg="#051E43">
      <Container size="md" h={392} className="flex w-full flex-col justify-center text-white">
        <Flex className="flex h-full items-center justify-between">
          <Box className="flex w-full justify-between">
            <Box className="flex flex-col gap-5">
              <Link href="/" className="flex gap-[10px] font-bold text-white no-underline">
                <Image src="/logo-96.png" width={40} height={40} alt="" />
                <Box>
                  <Title className="text-[18px]">CodeSmooth</Title>
                  <Text className="text-[9px]">GROW YOUR SKILLS</Text>
                </Box>
              </Link>
              <Flex className="flex gap-[14px]">
                <Link href="/">
                  <Image src="/assets/landing-page/facebook.svg" width={20} height={20} alt="" />
                </Link>
                <Link href="/">
                  <Image src="/assets/landing-page/twitter.svg" width={20} height={20} alt="" />
                </Link>
                <Link href="/">
                  <Image src="/assets/landing-page/TikTok.svg" width={20} height={20} alt="" />
                </Link>
                <Link href="/">
                  <Image src="/assets/landing-page/linkedin.svg" width={20} height={20} alt="" />
                </Link>
                <Link href="/">
                  <Image src="/assets/landing-page/youtube.svg" width={20} height={20} alt="" />
                </Link>
              </Flex>
            </Box>
            <Flex className="flex flex-col gap-[15px]">
              <Title className="mb-[30px] text-[24px] font-bold">Thông tin</Title>
              <Text className="text-[17px] text-[#CECECE]">Về chúng tôi</Text>
              <Text className="text-[17px] text-[#CECECE]">Liên hệ</Text>
              <Text className="text-[17px] text-[#CECECE]">Trung tâm hỗ trợ</Text>
              <Text className="text-[17px] text-[#CECECE]">Điều khoản sử dụng</Text>
            </Flex>
            <Flex className="flex flex-col gap-[15px]">
              <Title className="mb-[30px] text-[24px] font-bold">Khóa Học</Title>
              <Text className="text-[17px] text-[#CECECE]">NodeJS</Text>
              <Text className="text-[17px] text-[#CECECE]">ReactJS</Text>
              <Text className="text-[17px] text-[#CECECE]">Golang</Text>
              <Text className="text-[17px] text-[#CECECE]">Flutter</Text>
            </Flex>
            <Flex className="flex flex-col gap-[15px]">
              <Title className="mb-[30px] text-[24px] font-bold">Khóa Học</Title>
              <Text className="text-[17px] text-[#CECECE]">Backend</Text>
              <Text className="text-[17px] text-[#CECECE]">Frontend</Text>
              <Text className="text-[17px] text-[#CECECE]">DevOps</Text>
              <Text className="text-[17px] text-[#CECECE]">Data Engineer</Text>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Container
        size="xxxl"
        className="flex justify-center text-white"
        style={{ borderTop: '1px solid #363A93' }}
      >
        <Box className="flex h-[72px] w-[960px] items-center justify-between text-[14px] font-extralight">
          <Text>Copyright © 2023 CodeSmooth. All Rights Reserved.</Text>
          <Flex gap={32}>
            <Text>Privacy Policy</Text>
            <Text>Terms & Conditions</Text>
          </Flex>
        </Box>
      </Container>
    </Container>
  );
};

export default Footer;
