import DocumentIcon from '../../common/Icons/DocumentIcon';
import GroupIcon from '../../common/Icons/GroupIcon';
import NotificationIcon from '../../common/Icons/NotificationIcon';
import Footer from '../Footer';
import HeaderManage from '../Manage/Header';
import SidebarManage from '../Manage/Sidebar';

const listItem = [
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
];

const InstructorLayout = ({ children }) => {
  return (
    <>
      <HeaderManage />
      <div className="flex w-full">
        <SidebarManage bottom items={listItem} redirectPath="instructor" />
        {children}
      </div>
      <Footer />
    </>
  );
};

export { HeaderManage as HeaderInstructor, InstructorLayout };
