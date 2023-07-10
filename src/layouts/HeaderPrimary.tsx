import { Menu, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import DropdownList from '../components/DropdownList';
import { Avatar } from '../components/sub/avatar';

function HeaderNavButton({ label, href }) {
  return (
    <Link
      className="flex items-center px-[18px] py-[6px] text-[16px] font-normal leading-[24px] tracking-[0.15px]"
      href={href}
    >
      {label}
    </Link>
  );
}

const ListPopularCourse = () => {
  return (
    <div className="flex">
      <HeaderNavButton label={'Trang chủ'} href={'/home'}></HeaderNavButton>
      <DropdownList label={'Khóa học'} />
      <HeaderNavButton label={'Blog'} href={'/blog'}></HeaderNavButton>
      <HeaderNavButton label={'Liên hệ'} href={'/contact'}></HeaderNavButton>
    </div>
  );
};

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
          <Text size="sm" color="dark" className="text-lg">
            Khóa học của tôi
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Text size="sm" color="dark" className="text-lg">
            Giỏ hàng
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Link href={'instructor/course'}>
            <div className="flex items-center justify-between">
              <Text size="sm" color="dark" className="text-lg">
                Quản lý dạy học
              </Text>
            </div>
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
          <div className="flex items-center justify-between">
            <Text size="sm" color="dark" className="text-lg">
              Thông báo
            </Text>
            <Text
              size="sm"
              color="dark"
              className="flex h-[19px] w-[19px] items-center justify-center rounded-xl bg-[#1363DF] text-white"
            >
              1
            </Text>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="flex items-center justify-between">
            <Text size="sm" color="dark" className="text-lg">
              Tin nhắn
            </Text>
            <Text
              size="sm"
              color="dark"
              className="flex h-[19px] w-[19px] items-center justify-center rounded-xl bg-[#1363DF] text-white"
            >
              1
            </Text>
          </div>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item>
          <Text size="sm" color="dark" className="text-lg">
            Cài đặt tài khoản
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Text size="sm" color="dark" className="text-lg">
            Tin nhắn
          </Text>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item>
          <Text size="sm" color="dark" className="text-lg">
            Hổ trợ
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

const HeaderPrimary = () => {
  return (
    <div className="flex h-[74px] w-full items-center justify-between pl-[50px] pr-[82px] shadow">
      <Image src="/logo-96.png" alt="logo" width={40} height={40} />
      <ListPopularCourse />
      <div className=" flex h-[45px] w-[1100px] rounded-lg border border-light-border px-[12px]">
        <input
          className="border-none bg-white"
          placeholder="Tìm kiếm"
          // rightSection={
          //   <Image src="/images/home/Adornment-End.svg" alt="search" width={20} height={20} />
          // }
        />
        <Image src="/images/home/Adornment-End.svg" alt="search" width={25} height={25} />
      </div>

      <MenuUser />
    </div>
  );
};
export default HeaderPrimary;
