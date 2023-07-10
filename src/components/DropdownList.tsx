import { Divider, Grid, Menu } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { ListCourse } from './home/mockData';

function DropdownList({ label }) {
  return (
    <Menu
      position="bottom-start"
      trigger="hover"
      transitionProps={{
        exitDuration: 0,
      }}
      withinPortal
    >
      <Menu.Target>
        <Link
          key={label}
          className="flex items-center gap-[4px] px-[18px] py-[6px]"
          href="/course"
          onClick={(event) => event.preventDefault()}
        >
          <div key={label} className="flex items-center gap-[4px]">
            <span className="text-[16px] font-normal leading-[24px] tracking-[0.15px]">
              {label}
            </span>
            <Image
              className="pb-1"
              src="/images/home/chevron-down.svg"
              alt="arrow down"
              width={18}
              height={14}
            />
          </div>
        </Link>
      </Menu.Target>
      <Menu.Dropdown className="rounded-lg shadow">
        <div className="w-[645px] py-[12px]">
          <p className="px-[25px] pb-[12px] text-[16px] font-medium leading-[24px] tracking-[0.15px] text-black">
            {label}
          </p>
          <Divider className="w-full border-t-light-border" />
          <Grid className="px-[25px] pt-[15px]">
            {ListCourse.map((item) => (
              <Grid.Col span={6} key={item.name} className="flex gap-[9px]">
                <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md border border-[#C2C2C2]">
                  <img src={item.link} alt="logo" />
                </div>
                <div className="w-[234px]">
                  <p className="text-sm font-semibold text-black">{item.name}</p>
                  <p className="text-sm leading-[17px] text-[#6F6B80]">{item.description}</p>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DropdownList;
