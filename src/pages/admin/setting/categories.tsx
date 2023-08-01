import { Button, Group, Input, Modal, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import type { CourseCategory as AdminCategory } from '@/api/admin/setting';
import CodedraftsAdminSettingApi from '@/api/admin/setting';
import { CodedraftsApi } from '@/api/codedrafts-api';

import EditIcon from '../../../common/Icons/EditIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import AdminBar from '../../../components/Admin/bar';
import DecorAdmin from '../../../components/Admin/decor';
import { AdminLayout } from '../../../layouts/Admin/Admin';
import { TOAST_CONFIG } from '../../../shared/constants/app';
import { toastGetErrorMessage } from '../../../utils/app';

interface AdminCategorySettingItemProps {
  category: AdminCategory;
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
}
const AdminCategorySettingItem = (props: AdminCategorySettingItemProps) => {
  const [checked, setChecked] = useState(props.category.is_active);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <tr key={props.category.id} className="h-[58px] border-t border-light-border text-[20px]">
      <td>
        <div className="flex h-[45px] items-center px-[25px]">
          <p className="">{props.category.name}</p>
        </div>
      </td>
      <td>
        <a href={props.category.thumbnail} className="text-light-primary underline">
          Thumbnail
        </a>
      </td>
      <td>
        <div className="flex h-[45px] items-center">
          <p className="">
            {props.category.description.length > 50
              ? `${props.category.description.substring(0, 50)}...`
              : props.category.description}
          </p>
        </div>
      </td>
      <td>
        <div className="flex h-[45px] items-center px-[25px]">
          <p className="">{props.category.order}</p>
        </div>
      </td>
      <td>
        <div className="flex h-[45px] items-center px-[25px]">
          <Switch
            disabled={isLoading}
            checked={checked}
            onChange={async (event) => {
              try {
                toast.clearWaitingQueue();
                setIsLoading(true);
                await toast.promise(
                  CodedraftsAdminSettingApi.updateCategory(props.category.id, {
                    is_active: event.currentTarget.checked,
                  }),
                  {
                    ...TOAST_CONFIG,
                    error: {
                      render({ data }) {
                        return toastGetErrorMessage(data);
                      },
                    },
                  },
                );
                setChecked(event.currentTarget?.checked);
              } catch (error: any) {
                console.log(error);
              }
              setIsLoading(false);
            }}
          />
        </div>
      </td>
      <td>
        <div className="flex h-[45px] items-center gap-2 px-[25px]">
          <EditIcon
            className="cursor-pointer"
            onClick={() => props.onEdit(props.category)}
            height="24"
            width="24"
          />
          <TrashIcon
            className="cursor-pointer"
            onClick={() => props.onDelete(props.category)}
            height="24"
            width="24"
          />
        </div>
      </td>
    </tr>
  );
};

const SettingContent = () => {
  const [file, setFile] = useState<File | undefined>();
  const [opened, { open, close }] = useDisclosure(false);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [openedConfirm, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CodedraftsAdminSettingApi.getCateSetting();
        setCategories(res.data.data);
      } catch (error: any) {
        toast.error(toastGetErrorMessage(error));
      }
    };
    fetchCategories();
  }, []);

  interface FormValues {
    name?: string;
    description?: string;
    order?: number;
    thumbnail?: string;
    id?: number;
  }

  const initialValues: FormValues = {
    name: '',
    description: '',
    order: 0,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const reqCreateItem: any = {
          name: values.name,
          description: values.description,
          order: values.order,
        };
        if (file) {
          const res = await CodedraftsApi.uploadFiles([file]);
          // eslint-disable-next-line prefer-destructuring
          reqCreateItem.thumbnail = res.data.urls[0];
        } else {
          reqCreateItem.thumbnail = values.thumbnail;
        }

        if (!values.id) {
          await toast.promise(
            CodedraftsAdminSettingApi.createCategory(reqCreateItem),
            {
              pending: 'Đang tạo danh mục...',
              success: 'Tạo danh mục thành công!',
              error: {
                render({ data }) {
                  return toastGetErrorMessage(data);
                },
              },
            },
            TOAST_CONFIG,
          );
        } else {
          await toast.promise(
            CodedraftsAdminSettingApi.updateCategory(values.id, reqCreateItem),
            {
              pending: 'Đang cập nhật danh mục...',
              success: 'Cập nhật danh mục thành công!',
              error: {
                render({ data }) {
                  return toastGetErrorMessage(data);
                },
              },
            },
            TOAST_CONFIG,
          );
        }
        const res = await CodedraftsAdminSettingApi.getCateSetting();
        setCategories(res.data.data);
      } catch (error: any) {
        toast.error(toastGetErrorMessage(error));
      }
      close();

      resetForm({});
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Bạn phải nhập tên danh mục.'),
      order: Yup.string().required('Bạn phải nhập thứ tự.'),
      description: Yup.string().required('Mô tả không được để trống.'),
    }),
  });

  const onEdit = (category: AdminCategory) => {
    formik.setValues({
      name: category.name,
      description: category.description,
      order: category.order,
      thumbnail: category.thumbnail,
      id: category.id,
    });
    open();
  };

  const onDelete = async (category: AdminCategory) => {
    openConfirm();
    formik.setValues({
      id: category.id,
    });
  };

  const onConfirmDelete = async () => {
    try {
      // open confirm modal
      const { id } = formik.values;
      if (!id) return;
      await toast.promise(
        CodedraftsAdminSettingApi.deleteCategory(id),
        {
          pending: 'Đang xóa danh mục...',
          success: 'Xóa danh mục thành công!',
          error: {
            render({ data }) {
              return toastGetErrorMessage(data);
            },
          },
        },
        TOAST_CONFIG,
      );
      setCategories(categories.filter((item) => item.id !== id));
    } catch (error: any) {
      toast.error(toastGetErrorMessage(error));
    }
    closeConfirm();
  };

  return (
    <AdminLayout>
      <div className="flex  h-[860px] flex-1 flex-col gap-[50px] px-[150px] pt-[60px]">
        <DecorAdmin text="Danh mục" />
        <Modal size={400} title="Danh Mục" opened={opened} onClose={close} centered>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <label htmlFor="" className="text-sm">
              Trạng Thái
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-light-error text-sm">{formik.errors.name}</div>
            ) : null}
            <label htmlFor="" className="text-sm">
              Thứ Tự
            </label>
            <Input
              id="order"
              name="order"
              type="number"
              placeholder="Nhập ..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.order}
            />
            {formik.touched.order && formik.errors.order ? (
              <div className="text-light-error text-sm">{formik.errors.order}</div>
            ) : null}
            <div className="mb-2">
              <label htmlFor="" className="text-sm">
                Mô tả
              </label>
              <textarea
                name="description"
                id="description"
                className="h-20 w-full overflow-y-hidden rounded-lg border p-4 outline-none"
                placeholder="Please write here ..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>
            <label className="text-sm">Thumbnail</label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              placeholder="Enter thumbnail"
              onChange={(e) => {
                if (e.target) {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }
              }}
            />
            <p>Thumbnail hiện tại</p>
            {formik.values.thumbnail && (
              <img src={formik.values.thumbnail} alt="" className="h-20 w-20" />
            )}
            <Group position="center" mt="xl">
              <Button variant="outline" type="submit">
                Cập Nhật
              </Button>
            </Group>
          </form>
        </Modal>
        <Modal
          size={400}
          title="Xác nhận xóa"
          opened={openedConfirm}
          onClose={closeConfirm}
          centered
        >
          <div className="flex flex-col gap-[10px]">
            <p className="text-sm">Bạn có chắc chắn muốn xóa danh mục này không?</p>
            <Group position="center">
              <Button variant="outline" onClick={closeConfirm}>
                Hủy
              </Button>
              <Button variant="outline" onClick={() => onConfirmDelete()}>
                Xóa
              </Button>
            </Group>
          </div>
        </Modal>
        <AdminBar open={open} />
        <table className="table-auto gap-[10px] rounded-[5px] p-[10px] shadow-md">
          <thead>
            <tr className="h-10 text-[22px] font-medium">
              <th className="w-[150px]">
                <div className="flex h-[58px] items-center px-[25px]">
                  <p className="">Tên</p>
                </div>
              </th>
              <th className="w-[150px]">
                <div className="flex h-[58px] items-center">
                  <p className="">Ảnh</p>
                </div>
              </th>
              <th>
                <div className="flex h-[58px] items-center">
                  <p className="">Mô tả</p>
                </div>
              </th>
              <th className="w-[120px]">
                <div className="flex h-[58px] items-center justify-center">
                  <p className="">Thứ tự</p>
                </div>
              </th>
              <th className="w-[120px]">
                <div className="flex h-[58px] items-center justify-center">
                  <p className="">Trạng thái</p>
                </div>
              </th>
              <th className="w-[120px]">
                <div className="flex h-[58px] items-center justify-center">
                  <p className="">Action</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <AdminCategorySettingItem
                key={category.id}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default SettingContent;
