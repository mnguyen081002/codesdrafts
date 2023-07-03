import CategoryIcon from '../../common/Icons/CategoryIcon';
import SettingIcon from '../../common/Icons/SettingIcon';
import { ADMIN_PATH } from '../../routes/path';
import Footer from '../Footer';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';
import AdminSetting from './Settings';

enum AdminPathEnum {
  setting = 'setting',
}

const listItem = [
  {
    redirectPath: ADMIN_PATH.SETTINGS,
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
  [ADMIN_PATH.SETTINGS]: <AdminSetting />,
  [ADMIN_PATH.DASHBOARD]: <div>Dashboard</div>,
};

const AdminLayout = ({ children }) => {
  return (
    <>
      <HeaderManage />
      <div className="flex w-full">
        <SidebarManage items={listItem} redirectPath="admin" />
        {children}
      </div>
      <Footer />
    </>
  );
};

export { AdminLayout };
