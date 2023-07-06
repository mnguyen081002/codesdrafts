import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Field, FieldArray, Form, Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { SettingResponse } from '../../api/admin/setting';
import { CodeSmoothApi } from '../../api/codesmooth-api';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import AdminBar from '../../components/Admin/bar';
import DecorAdmin from '../../components/Admin/decor';

function SettingNavButton({ title, href, pkey }: { title: string; href: string; pkey?: string }) {
  return (
    <Link
      href={href}
      className="flex justify-between border-t border-light-border px-[12px] pt-[15px]"
    >
      <p className="text-lg font-normal text-light-text-primary">{title}</p>
      <p className="text-lg font-normal text-light-text-primary">{pkey}</p>
      <ArrowRightIcon />
    </Link>
  );
}

const AdminSetting = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [listSettings, setListSettings] = useState<SettingResponse[]>([]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const _ = await CodeSmoothApi.Admin.setting.saveSetting(values);
      // setMessage({
      //   isSuccess: true,
      //   message: 'Success',
      // });
    } catch (error: any) {
      // setMessage({ message: error.data.message, isSuccess: false });
    }

    resetForm({});
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await CodeSmoothApi.Admin.setting.getAllSettings();
      setListSettings(res.data.data);
    };

    fetch();
  }, []);

  return (
    <div className="flex w-full flex-col gap-[50px] px-[300px] pt-[60px]">
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
        <div className="flex justify-between px-[12px] font-medium">
          <p>Tên</p>
          <p>Key</p>
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
