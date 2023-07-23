import { Divider, Paper, Table } from '@mantine/core';
import Image from 'next/image';

import Button from '@/common/Button';
import ColumnChartMonthly from '@/components/chart/ColumnChart';
import { rows, StatisticalData, StatisticalUI } from '@/components/Instructor/Statistical';
import { Avatar } from '@/components/sub/avatar';

const dataDashboard = [
  {
    topName: 'Users',
    middleName: '28.05k',
    bottomNumber: '16.24%',
    icon: '/svg/admin/user.svg',
  },
  {
    topName: 'Tổng Khóa Học Đã Bán',
    middleName: '3m 40sec',
    bottomNumber: '0.24%',
    icon: '/svg/admin/clock.svg',
  },
  {
    topName: 'Sessions',
    middleName: '97.66k',
    bottomNumber: '3.96%',
    icon: '/svg/admin/arealine.svg',
  },
  {
    topName: 'Avg. Visit Duration',
    middleName: '3m 40sec',
    bottomNumber: '0.24%',
    icon: '/svg/admin/clock.svg',
  },
];

const PaymentStatistical = [
  {
    icon: '/svg/admin/icon-paypal.svg',
    name: 'Paypal',
    btName: 'Big Brands',
    money: '+$6235',
  },
  {
    icon: '/svg/admin/icon-master-card.svg',
    name: 'Credit Card',
    btName: 'Money reversed',
    money: '+$2235',
  },
  {
    icon: '/svg/admin/icon-pie.svg',
    name: 'Refund',
    btName: 'Big Payment',
    money: '-32$',
  },
];

const PaymentGateways = () => {
  return (
    <Paper
      shadow="xs"
      p={30}
      className="flex h-[440px] w-[421px] flex-col font-instructorSidebar text-[#2A3547]"
    >
      <span className="text-2xl font-semibold">Payment Gateways</span>
      <span className="text-sm font-normal">Payment Platform For Income</span>
      <div className="flex w-full flex-col gap-6">
        {PaymentStatistical.map((item) => (
          <div key={item.name} className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-light-bg-icon">
                <Image src={item.icon} alt="icon" width={24} height={24} />
              </div>
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span className="text-sm font-normal">{item.btName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold">{item.money}</span>
            </div>
          </div>
        ))}
        <Button
          text="View all transactions"
          className="flex h-12 w-full items-center justify-center rounded-[7px] border border-light-primary text-[#5D87FF]"
        />
      </div>
    </Paper>
  );
};

const TopReferals = () => {
  return (
    <Paper shadow="xs" className="flex h-[440px] w-[421px] flex-col">
      <span className="p-[15px] text-xl text-[#495057]">Top Referrals Pages</span>
      <Divider className="w-full" />
      <div className="flex items-center justify-between px-[20px] py-[10px]">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[#878A99]">Total Referrals Page</span>
          <span className="mt-[10px] mb-[9px] text-[21px] font-semibold text-[#495057]">
            725,800
          </span>
          <div className="flex">
            <span className="bg-[#f3f6f9] px-3 text-[11px] font-semibold text-[#FF7F41]">
              15.72%
            </span>
            <span className="text-sm font-normal text-[#878A99]">&nbsp;vs. previous month</span>
          </div>
        </div>
        <div>
          <Image src="/svg/admin/top-sale.svg" alt="manager" width={150} height={90} />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-[20px] py-[10px]">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-[#878A99]">www.google.com</span>
            <span className="text-sm font-normal ">24.58%</span>
          </div>
        ))}
      </div>
      <span className="mt-[20px] mb-[9px] cursor-pointer text-center text-[#878A99] underline">
        Show All
      </span>
    </Paper>
  );
};

const activeRows = Array.from({ length: 7 }, (_, index) => (
  <tr key={index} className="text-sm font-normal text-[#2A3547]">
    <td className="h-[45px] text-[#695EEF]">/themesbrand/</td>
    <td className="h-[45px]">99</td>
    <td className="h-[45px]">25.3%</td>
  </tr>
));

const TopPage = () => {
  return (
    <Paper shadow="xs" className="flex h-[440px] w-[421px] flex-col">
      <span className="p-[15px] text-xl text-[#495057]">Tops Pages</span>
      <div className="w-full">
        <Table>
          <thead>
            <tr className="bg-[#f3f6f9] text-[#878A99]">
              <div className="py-3">
                <th>Active Pages</th>
              </div>
              <th>Active</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>{activeRows}</tbody>
        </Table>
      </div>
    </Paper>
  );
};

const BottomDashboard = [
  {
    title: 'Payment Gateways',
    component: <PaymentGateways />,
  },
  {
    title: 'Top Referrals Pages',
    component: <TopReferals />,
  },
  {
    title: 'Top Pages',
    component: <TopPage />,
  },
];

const Dashboard = () => {
  return (
    <div className="w-full px-[190px] pt-[30px]">
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
      <div className="my-[50px] flex w-full gap-[50px]">
        {dataDashboard.map((item) => (
          <Paper
            key={item.icon}
            shadow="xs"
            p={20}
            className="flex h-[145px] w-[300px] items-start justify-between"
          >
            <div className="flex flex-col font-instructorSidebar">
              <span className="text-sm font-normal">{item.topName}</span>
              <span className="mt-3 text-[28px] font-semibold text-[#495057]">
                {item.middleName}
              </span>
              <div className="flex">
                <span className="bg-[#f3f6f9] px-3 text-[11px] font-semibold text-[#FF7F41]">
                  {item.bottomNumber}
                </span>
                <span className="text-sm font-normal">&nbsp;vs. previous month</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-light-bg-icon">
              <Image src={item.icon} alt="icon" width={24} height={24} />
            </div>
          </Paper>
        ))}
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
      <div className="mt-[50px] flex w-full items-center justify-between gap-[50px]">
        {BottomDashboard.map((item) => (
          <div key={item.title} className="my-[30px] flex flex-col">
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
