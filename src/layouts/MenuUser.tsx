import { Menu, Text } from '@mantine/core';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Avatar } from '../components/sub/avatar';

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
          <div className="flex w-full items-center gap-[8px]">
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
          <Link href={'/course'}>
            <Text color="dark" className="text-[16px]">
              Khóa học của tôi
            </Text>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/blog/my-posts'}>
            <Text color="dark" className="text-[16px]">
              Bài viết của tôi
            </Text>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Text color="dark" className="text-[16px]">
            Giỏ hàng
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/instructor/course'}>
            <div className="flex items-center justify-between">
              <Text color="dark" className="text-[16px]">
                Quản lý dạy học
              </Text>
            </div>
          </Link>
        </Menu.Item>
        {session.data?.token.user.role === 'ADMINSTRATOR' && (
          <Menu.Item>
            <Link href={'/admin/courses'} className="flex items-center justify-between">
              <Text color="dark" className="text-[16px]">
                Quản lý giảng viên
              </Text>
            </Link>
          </Menu.Item>
        )}

        <Menu.Divider />

        <Menu.Item>
          <div className="flex items-center justify-between">
            <Text color="dark" className="text-[16px]">
              Thông báo
            </Text>
            <Text
              color="dark"
              className="flex h-[19px] w-[19px] items-center justify-center rounded-xl bg-[#1363DF] text-white"
            >
              1
            </Text>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="flex items-center justify-between">
            <Text color="dark" className="text-[16px]">
              Tin nhắn
            </Text>
            <Text
              color="dark"
              className="flex h-[19px] w-[19px] items-center justify-center rounded-xl bg-[#1363DF] text-white"
            >
              1
            </Text>
          </div>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item>
          <Text color="dark" className="text-[16px]">
            Cài đặt tài khoản
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Text color="dark" className="text-[16px]">
            Tin nhắn
          </Text>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item>
          <Text color="dark" className="text-[16px]">
            Hổ trợ
          </Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            signOut();
          }}
        >
          <Text color="dark" className="text-[16px]">
            Đăng xuất
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuUser;
