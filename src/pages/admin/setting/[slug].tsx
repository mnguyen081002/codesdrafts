import { Button, Group, Input, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { CodedraftsApi } from '@/api/codedrafts-api';

import type { SettingResponse } from '../../../api/admin/setting';
import EditIcon from '../../../common/Icons/EditIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import AdminBar from '../../../components/Admin/bar';
import DecorAdmin from '../../../components/Admin/decor';
import { AdminLayout } from '../../../layouts/Admin/Admin';

const SettingItem = ({
  value,
  onSubmit,
  onDelete,
}: {
  value: string;
  onSubmit: (value: string) => void;
  onDelete: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const formik = useFormik({
    initialValues: {
      value,
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      onSubmit(values.value);
      close();
    },
    validationSchema: Yup.object().shape({
      value: Yup.string().required('Required'),
    }),
  });

  useEffect(() => {
    formik.setValues({ value });
  }, [value]);

  return (
    <tr className="border-t border-light-border">
      <Modal size={400} title="Danh Mục" opened={opened} onClose={close} centered>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <label htmlFor="" className="text-sm">
            Giá trị
          </label>
          <Input
            id="value"
            name="value"
            type="text"
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.value}
          />
          <Group position="center" mt="xl">
            <Button variant="outline" type="submit">
              Cập Nhật
            </Button>
          </Group>
        </form>
      </Modal>
      <td>
        <div className="flex h-[58px] items-center  px-[25px]">
          <p className="text-[20px]">{value}</p>
        </div>
      </td>
      <td>
        <div className="flex h-[58px] items-center justify-end gap-2 px-[25px]">
          <EditIcon
            className="cursor-pointer rounded-full hover:bg-slate-200"
            height="24"
            width="24"
            onClick={open}
          />
          <TrashIcon
            className="cursor-pointer rounded-full hover:bg-slate-200"
            height="24"
            width="24"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

const SettingContent = () => {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);
  const [settingValues, setSettingValues] = useState<string[]>([]);
  const [setting, setSetting] = useState<SettingResponse>();

  const getListSetting = async () => {
    if (!router.isReady) return;
    const { slug } = router.query as { slug: string };
    const res = await CodedraftsApi.Admin.Setting.getSettingByKey(slug);
    setSetting(res.data.data);
    setSettingValues(res.data.data.values);
  };

  const saveSetting = async (newValues: string[]) => {
    try {
      await CodedraftsApi.Admin.Setting.saveSetting({
        key: setting!.key,
        value: newValues,
        title: setting!.title,
      });

      await getListSetting();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newValues = [...settingValues, values.value];
      await saveSetting(newValues);
      close();
      resetForm({});
    },

    validationSchema: Yup.object().shape({
      value: Yup.string().required('Required'),
    }),
  });

  useEffect(() => {
    try {
      getListSetting();
    } catch (error) {
      console.log(error);
    }
  }, [router.isReady]);

  return (
    <AdminLayout>
      <div className="flex  h-[860px] flex-1 flex-col gap-[50px] px-[150px] pt-[60px]">
        <DecorAdmin text="Danh mục" />
        <Modal size={400} title="Danh Mục" opened={opened} onClose={close} centered>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <label htmlFor="" className="text-sm">
              Giá trị
            </label>
            <Input
              id="value"
              name="value"
              type="text"
              placeholder="Nhập giá trị"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value}
            />
            <Group position="center" mt="xl">
              <Button variant="outline" type="submit">
                Cập Nhật
              </Button>
            </Group>
          </form>
        </Modal>
        <AdminBar open={open} />
        <table className="table-auto gap-[10px] rounded-[5px] shadow-md">
          <thead>
            <tr className="h-10 text-[22px] font-semibold">
              <th>
                <div className="flex h-[58px] items-center px-[25px]">
                  <p className="">Giá trị</p>
                </div>
              </th>
              <th>
                <div className="flex h-[58px] items-center justify-end px-[25px]">
                  <p className="">Action</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {settingValues.map((item, index) => (
              <SettingItem
                value={item}
                onSubmit={async (v) => {
                  const newValues = [...settingValues];
                  newValues[index] = v;
                  await saveSetting(newValues);
                }}
                onDelete={async () => {
                  const newValues = [...settingValues];
                  newValues.splice(index, 1);
                  await saveSetting(newValues);
                }}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default SettingContent;
