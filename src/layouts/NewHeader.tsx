import { Flex, Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { HeaderNavbar } from './HeaderPrimary';

type HeaderProps = {
  right?: React.ReactNode;
  isHiddenNavbar?: boolean;
};

const Header = (props: HeaderProps) => {
  const navigate = useRouter();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const handleRouteChange = (url, { shallow }) => {
    if (shallow) return;
    setProgress(10);
  };

  const handleRouteComplete = (url, { shallow }) => {
    if (shallow) return;
    setProgress(100);
  };

  router.events?.on('routeChangeStart', handleRouteChange);
  router.events?.on('routeChangeComplete', handleRouteComplete);
  return (
    <>
      <div className="flex h-[64px] w-full items-center justify-center px-[30px] shadow-md">
        <div className="flex w-[1360px] justify-between">
          <Group className="flex gap-[65px]">
            <Flex justify="center">
              <Link href="/">
                <img src="/svg/logo/new-logo-white.svg" className="h-[50px] w-[180px]" alt="" />
              </Link>
            </Flex>
            {!props.isHiddenNavbar && <HeaderNavbar />}
          </Group>
          {props.right}
          {/* <Group spacing="xs">
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
            </Group> */}
        </div>
      </div>
      <LoadingBar color="#1363DF" progress={progress} onLoaderFinished={() => setProgress(0)} />
    </>
  );
};

export default Header;
