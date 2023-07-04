import NotificationIcon from '../../common/Icons/NotificationIcon';
import SidebarManageMenuItem from './SidebarMenuItem';

export interface SidebarManageItem {
  redirectPath: string;
  Icon: React.ComponentType<any>;
  text: string;
  badge?: boolean;
}

function SidebarManage({
  redirectPath,
  items,
  bottom,
}: {
  redirectPath: string;
  items: SidebarManageItem[];
  bottom?: boolean;
}) {
  return (
    <div className="flex h-[860] w-[248px] flex-col gap-[5px] border-r border-light-border pt-5">
      <div className="flex h-full flex-col justify-between">
        <div className="flex w-full flex-col justify-center gap-[5px] px-5">
          {items.map((item) => (
            <SidebarManageMenuItem
              key={item.redirectPath}
              redirectPath={`/${redirectPath}/${item.redirectPath}`}
              Icon={item.Icon}
              text={item.text}
              badge={item.badge}
            />
          ))}
        </div>
        {bottom && (
          <div>
            <div className="h-[1px] w-full bg-light-border"></div>
            <div className="px-5">
              <SidebarManageMenuItem
                redirectPath={`${redirectPath}/support`}
                Icon={NotificationIcon}
                badge
                text="Thông báo"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarManage;
