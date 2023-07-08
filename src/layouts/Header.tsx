import { Button, Container, Flex, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PATH_AUTH } from '@/routes/path';

const Header = () => {
  // get path from router
  const router = useRouter();
  const path = router.pathname;

  // check if path is /course/1
  const isCourseDetail = path.includes('/course/');
  return (
    <Container size="xxl" h={90}>
      <Flex justify="space-between" align="center" w="100%" h="100%">
        <Group>
          <Flex justify="center">
            <Link href="/">
              <Image src="/logo-96.png" width={40} height={40} alt="" />
            </Link>
          </Flex>
          <Group className="text-dark-90">
            <Button className="bg-transparent text-lg font-bold" color="dark" variant="white">
              Trang chủ
            </Button>
            <Button className="bg-transparent text-lg font-bold" color="dark" variant="white">
              Blog
            </Button>
            <Button className="bg-transparent text-lg font-bold" color="dark" variant="white">
              Liên hệ
            </Button>
          </Group>
        </Group>
        <Group spacing="xs">
          <Button className="bg-transparent text-lg" color="dark" variant="white">
            Tiếng Việt <img src="/images/icons/inactive.svg" className="rotate-180" alt="" />
          </Button>
          <Button
            className="relative bg-transparent text-lg text-light-primary after:absolute after:left-1/2 after:block after:h-[2px] after:w-8 after:-translate-x-1/2 after:rounded-md after:bg-light-primary after:content-['']"
            variant="white"
          >
            <Link href={PATH_AUTH.login} className="text-light-tertiary no-underline">
              Đăng nhập
            </Link>
          </Button>
          <Button
            className="rounded-2xl bg-light-primary text-lg shadow-forfun transition-all hover:bg-light-tertiary"
            variant="filled"
          >
            <Link href={PATH_AUTH.register} className="text-white no-underline">
              Đăng ký
            </Link>
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};

export default Header;
