import Link from 'next/link';

import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import DecorAdmin from '../../components/Admin/decor';

const AdminSetting = () => {
  return (
    <div className="flex w-full flex-col gap-[50px] px-[300px] pt-[60px]">
      <DecorAdmin text="Cài đặt" />
      <div className="flex flex-col gap-[10px] rounded-[5px] p-[10px] shadow">
        <div className="flex px-[12px] font-medium">Tên</div>
        <Link
          href="/admin/setting/categories"
          className="flex justify-between border-t border-light-border px-[12px] pt-[15px]"
        >
          <p className="text-lg font-normal text-light-text-primary">Danh mục</p>
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};

export default AdminSetting;
