import { Menu, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import PrimaryLogo from '../../components/PrimaryLogo';
import { Avatar } from '../../components/sub/avatar';

const MenuUser = () => {
  const session: any = useSession();

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
            <Text className="text-[16px]">Quay lại trang học viên</Text>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/instructor/course'} className="flex items-center justify-between">
            <Text className="text-[16px]">Quản lý dạy học</Text>
          </Link>
        </Menu.Item>
        {session.data?.token.user.role === 'ADMINSTRATOR' && (
          <Menu.Item>
            <Link href={'/admin/courses'} className="flex items-center justify-between">
              <Text className="text-[16px]">Quản lý giảng viên</Text>
            </Link>
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item>
          <Text className="text-[16px]">Hỗ trợ</Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            signOut();
          }}
        >
          <Text className="text-[16px]">Đăng xuất</Text>
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
      <div className="sticky top-0  z-20 flex h-[64px] w-full items-center justify-between bg-white pl-[25px] pr-[40px] shadow">
        <Link href={'/'} className="flex items-center gap-2">
          <PrimaryLogo />
          <p className="font-inter text-[20px] font-semibold leading-6">{`${suffix}`}</p>
        </Link>
        {rightContent}
        {showAvatar && <MenuUser />}
      </div>
      <LoadingBar color="#1363DF" progress={progress} onLoaderFinished={() => setProgress(0)} />
    </>
  );
};

export default HeaderManage;
