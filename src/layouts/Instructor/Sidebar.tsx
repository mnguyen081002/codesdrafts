import DocumentIcon from '../../common/Icons/DocumentIcon';
import GroupIcon from '../../common/Icons/GroupIcon';
import NotificationIcon from '../../common/Icons/NotificationIcon';
import SideBarInstructorMenuItem from './SidebarMenuItem';

function SideBarInstructor() {
  return (
    <div className="flex h-[860] w-[248px] flex-col gap-[5px] border-r border-light-border pt-5">
      <div className="flex h-full flex-col justify-between">
        <div className="flex w-full flex-col justify-center gap-[5px] px-5">
          <SideBarInstructorMenuItem
            redirectPath="list-course"
            Icon={DocumentIcon}
            text="Khóa Học"
          />
          <SideBarInstructorMenuItem redirectPath="students" Icon={GroupIcon} text="Học Viên" />
          <SideBarInstructorMenuItem
            redirectPath="notification"
            Icon={NotificationIcon}
            badge
            text="Thông Báo"
          />
        </div>
        <div>
          <div className="h-[1px] w-full bg-light-border"></div>
          <div className="px-5">
            <SideBarInstructorMenuItem
              redirectPath="support"
              Icon={NotificationIcon}
              badge
              text="Thông báo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarInstructor;
