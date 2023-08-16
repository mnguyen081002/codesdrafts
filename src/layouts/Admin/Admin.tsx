import ColumnChartIcon from '../../common/Icons/ColumnChart';
import DocumentIcon from '../../common/Icons/DocumentIcon';
import GroupIcon from '../../common/Icons/GroupIcon';
import NotificationIcon from '../../common/Icons/NotificationIcon';
import SettingIcon from '../../common/Icons/SettingIcon';
import TransactionIcon from '../../common/Icons/TransactionIcon';
import { ADMIN_PATH } from '../../routes/path';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';
import Dashboard from './Dashboard';
import AdminListCoursePage from './ListCourse';
import AdminSetting from './Settings';

const listItem = [
  {
    redirectPath: ADMIN_PATH.COURSES,
    Icon: DocumentIcon,
    text: 'Khóa học',
  },
  {
    redirectPath: ADMIN_PATH.STUDENTS,
    Icon: GroupIcon,
    text: 'Học Viên',
  },
  {
    redirectPath: ADMIN_PATH.NOTIFICATIONS,
    Icon: NotificationIcon,
    badge: true,
    text: 'Thông Báo',
  },
  {
    redirectPath: ADMIN_PATH.DASHBOARD,
    Icon: ColumnChartIcon,
    text: 'Thống Kê',
  },
  {
    redirectPath: ADMIN_PATH.TRANSACTIONS,
    Icon: TransactionIcon,
    text: 'Giao Dịch',
  },
  {
    redirectPath: ADMIN_PATH.SETTING,
    Icon: SettingIcon,
    text: 'Cài Đặt',
  },
];

export const mapAdminPage = {
  [ADMIN_PATH.SETTING]: <AdminSetting />,
  [ADMIN_PATH.COURSES]: <AdminListCoursePage />,
  [ADMIN_PATH.DASHBOARD]: <Dashboard />,
};

const AdminLayout = ({ children }) => {
  return (
    <>
      <HeaderManage suffix="Admin" showAvatar />
      <div className="flex w-full">
        <SidebarManage items={listItem} redirectPath="admin" />
        {children}
      </div>
    </>
  );
};

export { AdminLayout };
