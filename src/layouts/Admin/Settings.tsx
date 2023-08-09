import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Field, FieldArray, Form, Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { SettingResponse } from '../../api/admin/setting';
import CodedraftsAdminSettingApi from '../../api/admin/setting';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import AdminBar from '../../components/Admin/bar';
import DecorAdmin from '../../components/Admin/decor';
import { TOAST_CONFIG } from '../../shared/constants/app';
import { toastGetErrorMessage } from '../../utils/app';

function SettingNavButton({ title, href, pkey }: { title: string; href: string; pkey?: string }) {
  return (
    <Link
      href={href}
      className="flex justify-between border-t border-light-border px-[12px] pt-[15px]"
    >
      <div className="flex">
        <p className="w-[600px] text-[20px] font-medium">{title}</p>
        <p className="text-[18px] text-light-text-primary">{pkey}</p>
      </div>
      <ArrowRightIcon />
    </Link>
  );
}

const AdminSetting = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [listSettings, setListSettings] = useState<SettingResponse[]>([]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const _ = await CodedraftsAdminSettingApi.saveSetting(values);

    await toast.promise(
      CodedraftsAdminSettingApi.saveSetting(values),
      {
        pending: 'Đang lưu...',
        success: 'Thành công',
        error: {
          render({ data }) {
            return toastGetErrorMessage(data);
          },
        },
      },
      TOAST_CONFIG,
    );

    resetForm({});
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await CodedraftsAdminSettingApi.getAllSettings();
      setListSettings(res.data.data);
    };

    fetch();
  }, []);

  return (
    <div className="flex w-full flex-col gap-[50px] px-[150px] pt-[60px]">
      <DecorAdmin text="Cài đặt" />
      <Modal size={400} title="Cài đặt" opened={opened} onClose={close} centered>
        <Formik
          initialValues={{
            title: '',
            key: '',
            values: [''],
          }}
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-3"
        >
          {({ values }) => (
            <Form>
              <label htmlFor="" className="text-sm">
                Key
              </label>
              <Field
                className="rounded-[5px] bg-white placeholder:text-sm"
                id="key"
                name="key"
                type="text"
                placeholder="Nhập Key"
              />
              <label htmlFor="" className="text-sm">
                Tên
              </label>
              <Field
                className="rounded-[5px] bg-white placeholder:text-sm"
                id="title"
                name="title"
                type="text"
                placeholder="Nhập Tên"
              />
              <FieldArray validateOnChange={false} name="values">
                {(arrayHelpers) => (
                  <div className="flex flex-col gap-3">
                    {values.values.length > 0 && (
                      <div>
                        {values.values.map((v, index) => (
                          <div className="flex w-full items-end gap-4" key={index}>
                            <div className="w-full">
                              <label className="text-sm" htmlFor={`values.${index}`}>
                                Giá trị
                              </label>
                              <Field
                                className="rounded-[5px] bg-white placeholder:text-sm"
                                name={`values.${index}`}
                                placeholder="Nhập giá trị"
                                type="text"
                              />
                            </div>
                            <Button
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                              variant="outline"
                              className="border-red-400 px-3 text-xs text-red-400"
                            >
                              Xóa
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className="px-3 text-xs"
                      variant="outline"
                      type="button"
                      onClick={() => arrayHelpers.push('')}
                    >
                      Thêm
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Group position="center" mt="xl">
                <Button className="bg-light-primary" variant="filled" type="submit">
                  Cập Nhật
                </Button>
              </Group>
            </Form>
          )}
        </Formik>
      </Modal>
      <AdminBar open={open} />
      <div className="flex flex-col gap-[10px] rounded-[5px] p-[10px] shadow-md">
        <div className="flex px-[12px] text-[22px] font-semibold">
          <p className="w-[600px] font-semibold">Tên</p>
          <p className="font-semibold">Key</p>
          <p></p>
        </div>
        <SettingNavButton href={'/admin/setting/categories'} title="Danh Mục" />
        {listSettings.map((setting) => (
          <SettingNavButton
            key={setting.key}
            pkey={setting.key}
            href={`/admin/setting/${setting.key}`}
            title={setting.title}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSetting;
