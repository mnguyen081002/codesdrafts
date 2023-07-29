import { Button, Group, Input, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import type { CreateCategoryRequest } from '@/api/admin/setting';
import { CodedraftsApi } from '@/api/codedrafts-api';

import EditIcon from '../../../common/Icons/EditIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import AdminBar from '../../../components/Admin/bar';
import DecorAdmin from '../../../components/Admin/decor';
import { AdminLayout } from '../../../layouts/Admin/Admin';

const SettingContent = () => {
  const router = useRouter();

  const { page } = router.query;

  const [file, setFile] = useState<File | undefined>();
  const [opened, { open, close }] = useDisclosure(false);

  const initialValues = {
    name: '',
    description: '',
    order: 0,
    thumbnail: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!file) {
          throw new Error('File is required');
        }

        const res = await CodedraftsApi.uploadFiles([file]);

        const reqCreateItem: CreateCategoryRequest = {
          name: values.name,
          description: values.description,
          order: values.order,
          thumbnail: res.data.urls[0],
        };

        const _ = await CodedraftsApi.Admin.Setting.createCategory(reqCreateItem);
        // setMessage({
        //   isSuccess: true,
        //   message: 'Success',
        // });
      } catch (error: any) {
        // setMessage({ message: error.data.message, isSuccess: false });
      }

      resetForm({});
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('You must enter your name.'),
      order: Yup.string().required('You must enter your order.'),
      description: Yup.string().required('You must enter your description.'),
    }),
  });

  return (
    <AdminLayout>
      <div className="flex  h-[860px] flex-1 flex-col gap-[50px] px-[300px] pt-[60px]">
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
            <Group position="center" mt="xl">
              <Button variant="outline" type="submit">
                Cập Nhật
              </Button>
            </Group>
          </form>
        </Modal>
        <AdminBar open={open} />
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
