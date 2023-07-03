import { useRouter } from 'next/router';

import EditIcon from '../../../common/Icons/EditIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import DecorAdmin from '../../../components/Admin/decor';
import { AdminLayout } from '../../../layouts/Admin/Admin';

const SettingContent = () => {
  const router = useRouter();

  const { page } = router.query;
  return (
    <AdminLayout>
      <div className="flex  h-[860px] flex-1 flex-col gap-[50px] px-[300px] pt-[60px]">
        <DecorAdmin text="Danh mục" />
        <table className="table-auto gap-[10px] rounded-[5px] p-[10px] shadow-md">
          <thead>
            <tr className="h-10 text-lg font-medium text-light-text-primary">
              <th>
                <div className="flex h-[45px] items-center px-[15px]">
                  <p className="">Tên</p>
                </div>
              </th>
              <th>
                <div className="flex h-[45px] items-center px-[15px]">
                  <p className="">Ảnh</p>
                </div>
              </th>
              <th>
                <div className="flex h-[45px] items-center px-[15px]">
                  <p className="">Mô tả</p>
                </div>
              </th>
              <th>
                <div className="flex h-[45px] items-center">
                  <p className="">Trạng thái</p>
                </div>
              </th>
              <th>
                <div className="flex h-[45px] items-center px-[15px]">
                  <p className="">Action</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-light-border">
              <td>
                <div className="flex h-[45px] items-center px-[10px]">
                  <p className="">NodeJs</p>
                </div>
              </td>
              <td>
                <a href="" className="text-light-primary underline">
                  Thumbnail
                </a>
              </td>
              <td>
                <div className="flex h-[45px] items-center px-[10px]">
                  <p className="">
                    Node.js® là môi trường thời gian chạy JavaScript đa nền tảng, mã nguồn mở
                  </p>
                </div>
              </td>
              <td>
                <div className="flex h-[45px] items-center px-[10px]">
                  <p className="">Active</p>
                </div>
              </td>
              <td>
                <div className="flex h-[45px] items-center gap-2 px-[10px]">
                  <EditIcon height="20" width="20" />
                  <TrashIcon height="20" width="20" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default SettingContent;
