import SettingIcon from '../../common/Icons/SettingIcon';
import Footer from '../Footer';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';
import AdminSetting from './Settings';

enum AdminPathEnum {
  setting = 'setting',
}

const listItem = [
  {
    redirectPath: AdminPathEnum.setting,
    Icon: SettingIcon,
    text: 'Cài Đặt',
  },
];

export const mapAdminPage = {
  [AdminPathEnum.setting]: <AdminSetting />,
};

const AdminLayout = ({ children }) => {
  return (
    <>
      <HeaderManage />
      <div className="flex w-full">
        <SidebarManage items={listItem} redirectPath="/admin" />
        {children}
      </div>
      <Footer />
    </>
  );
};

export { AdminLayout };
