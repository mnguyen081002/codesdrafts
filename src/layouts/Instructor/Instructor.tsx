import ColumnChartIcon from '@/common/Icons/ColumnChart';

import DocumentIcon from '../../common/Icons/DocumentIcon';
import GroupIcon from '../../common/Icons/GroupIcon';
import NotificationIcon from '../../common/Icons/NotificationIcon';
import ProfileIcon from '../../common/Icons/ProfileIcon';
import TransactionIcon from '../../common/Icons/TransactionIcon';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';

export const listInstructorSidebarItem = [
  {
    redirectPath: 'course',
    Icon: DocumentIcon,
    text: 'Khóa Học',
  },
  {
    redirectPath: 'students',
    Icon: GroupIcon,
    text: 'Học Viên',
  },
  {
    redirectPath: 'notification',
    Icon: NotificationIcon,
    badge: true,
    text: 'Thông Báo',
  },
  {
    redirectPath: 'statistical',
    Icon: ColumnChartIcon,
    text: 'Thống Kê',
  },
  {
    redirectPath: 'transaction',
    Icon: TransactionIcon,
    text: 'Giao Dịch',
  },
  {
    redirectPath: 'profile',
    Icon: ProfileIcon,
    text: 'Hồ Sơ',
  },
];

const InstructorLayout = ({ children }) => {
  return (
    <div className="h-screen overflow-clip">
      <HeaderManage showAvatar />
      <div className="flex w-full">
        <SidebarManage bottom items={listInstructorSidebarItem} redirectPath="instructor" />
        {children}
      </div>
    </div>
  );
};

export { HeaderManage as HeaderInstructor, InstructorLayout };
