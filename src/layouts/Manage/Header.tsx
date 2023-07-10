import { Menu, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Avatar } from '../../components/sub/avatar';
import { APP_NAME } from '../../shared/constants/app';

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
            <Text size="sm" color="dark" className="text-lg">
              Quay lại trang học viên
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
        <Menu.Item>
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
}: {
  rightContent?: React.ReactNode;
  showAvatar?: boolean;
}) => {
  return (
    <div className="flex h-[74px] w-full items-center justify-between pl-[25px] pr-[40px] shadow">
      <div className="flex items-center gap-2">
        <Image src="/logo-96.png" alt="logo" width={40} height={40} />
        <p className="font-inter text-[20px] font-semibold leading-6">{APP_NAME}</p>
      </div>
      {rightContent}
      {showAvatar && <MenuUser />}
    </div>
  );
};

export default HeaderManage;
