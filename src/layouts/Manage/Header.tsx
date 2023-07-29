import { Menu, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { Avatar } from '../../components/sub/avatar';
import { APP_NAME } from '../../shared/constants/app';

const MenuUser = () => {
  const session: any = useSession();

  console.log('session', session);

  return (
    <Menu shadow="md" width={285} position="top-end">
      <Menu.Target>
        <div>
          <Avatar url={session.data?.token.user.avatar} dot />
        </div>
      </Menu.Target>
      <Menu.Dropdown px={2}>
        <Menu.Item>
          <div className="flex w-full items-center gap-[8px] ">
            <Avatar url={session.data?.token.user.avatar} h={50} w={50} />
            <div>
              <Text className="text-xl" weight={500}>
                {session.data?.token.user.username}
              </Text>
              <Text
                size="xs"
                color="dimmed"
                fw={500}
                fz={12}
                sx={{
                  color: '#6D6D6D',
                }}
              >
                {session.data?.token.user.email}
              </Text>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/home'} className="flex items-center justify-between">
            <Text size="sm" color="dark" className="text-lg">
              Quay lại trang học viên
            </Text>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/admin/courses'} className="flex items-center justify-between">
            <Text size="sm" color="dark" className="text-lg">
              Quản lý dạy học
            </Text>
          </Link>
        </Menu.Item>
        {session.data?.token.user.role === 'ADMINSTRATOR' && (
          <Menu.Item>
            <Link href={'/admin/courses'} className="flex items-center justify-between">
              <Text size="sm" color="dark" className="text-lg">
                Quản lý giảng viên
              </Text>
            </Link>
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item>
          <Text size="sm" color="dark" className="text-lg">
            Hỗ trợ
          </Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            signOut();
          }}
        >
          <Text size="sm" color="dark" className="text-lg">
            Đăng xuất
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const HeaderManage = ({
  rightContent,
  showAvatar,
  suffix = '',
}: {
  rightContent?: React.ReactNode;
  showAvatar?: boolean;
  suffix?: string;
}) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const handleRouteChange = (url, { shallow }) => {
    setProgress(10);
  };

  const handleRouteComplete = (url, { shallow }) => {
    setProgress(100);
  };

  router.events?.on('routeChangeStart', handleRouteChange);
  router.events?.on('routeChangeComplete', handleRouteComplete);
  return (
    <>
      <div className="sticky top-0  z-20 flex h-[74px] w-full items-center justify-between bg-white pl-[25px] pr-[40px] shadow">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src="/logo-96.png" alt="logo" width={40} height={40} />
          <p className="font-inter text-[20px] font-semibold leading-6">
            {`${APP_NAME} ${suffix}`}
          </p>
        </Link>
        {rightContent}
        {showAvatar && <MenuUser />}
      </div>
      <LoadingBar color="#1363DF" progress={progress} onLoaderFinished={() => setProgress(0)} />
    </>
  );
};

export default HeaderManage;
