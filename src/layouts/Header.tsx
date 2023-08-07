import { Button, Flex, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PATH_AUTH } from '@/routes/path';

const Header = () => {
  const navigate = useRouter();
  return (
    <div className="flex h-[74px] px-[50px] shadow-md">
      <Flex justify="space-between" align="center" w="100%" h="100%">
        <Group>
          <Flex justify="center">
            <Link href="/">
              <Image src="/logo-96.png" width={40} height={40} alt="" />
            </Link>
          </Flex>
          <Group className="text-dark-90">
            <Button
              className="px-[18px] py-[6px] text-[16px] font-medium leading-[24px] tracking-[0.15px]"
              color="dark"
              variant="white"
            >
              Trang chủ
            </Button>
            <Button
              className="px-[18px] py-[6px] text-[16px] font-medium leading-[24px] tracking-[0.15px]"
              color="dark"
              variant="white"
            >
              Blog
            </Button>
            <Button
              className="px-[18px] py-[6px] text-[16px] font-medium leading-[24px] tracking-[0.15px]"
              color="dark"
              variant="white"
              onClick={() => navigate.push('/contact')}
            >
              Liên hệ
            </Button>
          </Group>
        </Group>
        <Group spacing="xs">
          {/* <Button
            className="px-[18px] py-[6px] text-[16px] font-normal leading-[24px] tracking-[0.15px]"
            color="dark"
            variant="white"
          >
            Tiếng Việt <img src="/images/icons/inactive.svg" className="rotate-180" alt="" />
          </Button> */}
          <Button
            className="relative bg-transparent text-lg text-light-primary after:absolute after:left-1/2 after:block after:h-[2px] after:w-8 after:-translate-x-1/2 after:rounded-md after:bg-light-primary after:content-['']"
            variant="white"
          >
            <Link href={PATH_AUTH.login} className="text-light-primary no-underline">
              Đăng nhập
            </Link>
          </Button>
          <Button
            className="rounded-2xl bg-light-primary text-lg transition-all hover:bg-light-tertiary"
            variant="filled"
          >
            <Link href={PATH_AUTH.register} className="text-white no-underline">
              Đăng ký
            </Link>
          </Button>
        </Group>
      </Flex>
    </div>
  );
};

export default Header;
