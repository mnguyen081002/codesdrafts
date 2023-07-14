import { Divider, Paper, Table } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

import ColumnChartMonthly from '../chart/ColumnChart';
import LineChartMonthly from '../chart/LineChart';
import { Avatar } from '../sub/avatar';

type StatisticalDataProps = {
  title: string;
  downText: string;
  leftIcon?: React.ReactNode;
  lefDivider?: boolean;
};

const StatisticalData = [
  {
    title: '$2,340',
    downText: 'Doanh số',
    leftIcon: <img src="/svg/upVote.svg" alt="arrow-down" className="h-[24px] w-[18px]" />,
    leftDivider: true,
  },
  {
    title: '35%',
    downText: 'Hiệu xuất',
    leftIcon: <img src="/svg/upVote.svg" alt="arrow-down" className="h-[24px] w-[18px]" />,
    leftDivider: true,
  },
  {
    title: '150',
    downText: 'Lượt xem',
    leftDivider: true,
  },
  {
    title: '3',
    downText: 'Khóa học',
  },
];

const StatisticalUI = ({ title, downText, leftIcon, lefDivider }: StatisticalDataProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col text-[#2A3547]">
        <div className="flex items-center gap-1">
          <span className="text-3xl font-semibold">{title}</span>
          {leftIcon}
        </div>
        <span className="h-[25px] w-[65px] font-instructorSidebar text-sm font-normal">
          {downText}
        </span>
      </div>
      {lefDivider && (
        <Divider orientation="vertical" className="mx-[30px] h-full border-l-light-border" />
      )}
    </div>
  );
};

const Statistical = () => {
  const rows = Array.from({ length: 3 }, (_, index) => (
    <tr key={index} className="text-center text-sm font-normal text-[#2A3547]">
      <td className="flex h-20 items-center gap-2">
        <div>
          <Image src="/images/manager/gaming.png" alt="manager" width={48} height={48} />
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm font-semibold">Gaming Console</span>
          <span className="text-left text-xs font-normal">Electronics</span>
        </div>
      </td>
      <td className="w-[100px] ">100</td>
      <td>50</td>
      <td>35.000.000</td>
      <td>
        <LineChartMonthly name="" data={[10000000, 500000, 35000000]} />
      </td>
    </tr>
  ));
  return (
    <div className="w-full px-16">
      <div className="mt-[50px] flex w-full items-center justify-between">
        <div className="flex w-[490px] flex-col">
          <div className="mb-[40px]  flex items-center gap-3">
            <Avatar />
            <span className="text-lg font-semibold text-[#2A3547]">Chào Minh Nguyên !</span>
          </div>
          <div className="flex">
            {StatisticalData.map((item) => (
              <StatisticalUI
                key={item.title}
                title={item.title}
                downText={item.downText}
                leftIcon={item.leftIcon}
                lefDivider={item.leftDivider}
              />
            ))}
          </div>
        </div>
        <div>
          <Image src="/svg/manager.svg" alt="manager" width={340} height={340} />
        </div>
      </div>
      <div className="mt-[50px] flex w-full items-center justify-between">
        <Paper shadow="xs" p={30} className="flex h-[390px] w-[478px] flex-col">
          <span className="font-instructorSidebar text-lg font-semibold">Doanh thu khóa học</span>
          <span className="font-instructorSidebar text-sm font-normal">Mỗi tháng</span>

          <div>
            <ColumnChartMonthly
              name="VNĐ"
              data={[100, 58, 77, 51, 46, 57, 48, 201, 58, 77, 51, 46]}
            />
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <Image src="/svg/bluethreedot.svg" alt="manager" width={38} height={38} />
              <div className="flex flex-col items-center">
                <span className="font-instructorSidebar text-sm font-normal">Doanh số</span>
                <span className="text-base font-semibold">$36,358</span>
              </div>
            </div>
          </div>
        </Paper>
        <Paper shadow="xs" p={30} className="flex h-[390px] w-[764px] flex-col">
          <div
            className="mb-6 flex items-end justify-between font-instructorSidebar text-lg
          font-semibold"
          >
            <span>Hiệu suất các khóa học</span>
            <div className="mr-12 flex cursor-pointer items-end gap-1">
              <Image src="/svg/TriangoDown.svg" alt="triangodown" width={24} height={24} />
              <span className="font-instructorSidebar text-sm font-normal">March 2023</span>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Lượt mua</th>
                <th>Lượt xem</th>
                <th>Doanh số</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};
export default Statistical;
