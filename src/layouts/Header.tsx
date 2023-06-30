import { Button, Container, Flex, Group } from '@mantine/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  // get path from router
  const router = useRouter();
  const path = router.pathname;

  // check if path is /course/1
  const isCourseDetail = path.includes('/course/');
  return (
    <Container size="xxl" className="w-full border" h={74} px={50} py={24}>
      <Flex justify="space-between" align="center" w="100%" h="100%">
        <Group>
          <Flex justify="center">
            <Link href="/">
              <Image src="/logo-96.png" width={40} height={40} alt="" />
            </Link>
          </Flex>
          <Group className="text-black">
            <Button className="text-lg font-normal" color="dark" variant="white">
              Trang chủ
            </Button>
            <Button className="text-lg font-normal" color="dark" variant="white">
              Blog
            </Button>
            <Button className="text-lg font-normal" color="dark" variant="white">
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
            <Link href="/login" className="text-[#25262b] no-underline">
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
  );
};

export default Header;