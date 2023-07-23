import CategoryIcon from '../../common/Icons/CategoryIcon';
import DocumentIcon from '../../common/Icons/DocumentIcon';
import SettingIcon from '../../common/Icons/SettingIcon';
import { ADMIN_PATH } from '../../routes/path';
import Footer from '../Footer';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';
import Dashboard from './Dashboard';
import AdminListCoursePage from './ListCourse';
import AdminSetting from './Settings';

enum AdminPathEnum {
  setting = 'setting',
}

const listItem = [
  {
    redirectPath: ADMIN_PATH.COURSES,
    Icon: DocumentIcon,
    text: 'Khóa học',
  },
  {
    redirectPath: ADMIN_PATH.SETTING,
    Icon: SettingIcon,
    text: 'Cài Đặt',
  },
  {
    redirectPath: ADMIN_PATH.DASHBOARD,
    Icon: CategoryIcon,
    text: 'Dashboard',
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
      <HeaderManage showAvatar />
      <div className="flex w-full">
        <SidebarManage items={listItem} redirectPath="admin" />
        {children}
      </div>
      <Footer />
    </>
  );
};

export { AdminLayout };
