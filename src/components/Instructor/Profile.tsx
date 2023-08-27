import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mantine/core';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import type { SettingResponse } from '@/api/admin/setting';
import CodedraftsAdminSettingApi from '@/api/admin/setting';
import { StudentApi } from '@/api/codedrafts-api';
import CodedraftsInstructorLessonApi from '@/api/instructor/lesson';
import { InputRectangle, RFHInputThumbnail } from '@/common/Input';

import { PrimaryButton } from '../Button';
import FormProvider from '../hook-form/FormProvider';
import RHFArea from '../hook-form/RHFArea';
import RHFSelect from '../hook-form/RHFSelect';

type FormValuesProps = {
  username: string;
  avatar: File | string;
  title: string;
  bio: string;
  email: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  bankNumber: string;
  bankCode: string;
  bankOwnerName: string;
};

export const socialSettings = [
  {
    name: 'facebook_url',
    icon: '/svg/social/facebook.svg',
  },
  {
    name: 'twitter_url',
    icon: '/svg/social/twitter.svg',
  },
  {
    name: 'youtube_url',
    icon: '/svg/social/youtube.svg',
  },
  {
    name: 'linkedin_url',
    icon: '/svg/social/linkedin.svg',
  },
];

export interface PaymentResponse {
  bin: string;
  code: string;
  id: number;
  isTransfer: number;
  logo: string;
  lookupSupported: number;
  name: string;
  shortName: string;
  short_name: string;
}

const Profile = () => {
  const { isReady } = useRouter();

  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentResponse[]>([]);
  const ProfileSchema = Yup.object().shape({
    bankOwnerName: Yup.string().matches(
      /^[a-zA-Z0-9 ]*$/,
      'Tên chủ tài khoản không được chứa ký tự đặc biệt',
    ),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ProfileSchema),
  });

  const { reset, handleSubmit, setError } = methods;
  const [title, settitle] = useState<SettingResponse>();

  useEffect(() => {
    const loadPaymentMethod = async () => {
      if (paymentMethod.length > 0) return;
      const paymentMethodRes = await axios.get('https://api.vietqr.io/v2/banks');
      setPaymentMethod(paymentMethodRes.data.data);
    };

    const loadProfile = async () => {
      const profile = await CodedraftsInstructorLessonApi.getMe();
      const paymentList = paymentMethod;
      if (paymentList.length === 0) {
        const paymentMethodRes = await axios.get('https://api.vietqr.io/v2/banks');
        setPaymentMethod(paymentMethodRes.data.data);
        paymentList.push(...paymentMethodRes.data.data);
      }
      const foundItem = paymentList.find((item) => item.code === profile.data.bank_code);

      reset({
        username: profile.data.username,
        bio: profile.data.bio,
        email: profile.data.email,
        title: profile.data.title || '',
        facebook_url: profile.data.facebook_url,
        twitter_url: profile.data.twitter_url,
        linkedin_url: profile.data.linkedin_url,
        youtube_url: profile.data.youtube_url,
        bankOwnerName: profile.data.bank_owner_name,
        bankCode: foundItem?.name,
        bankNumber: profile.data.bank_number,
      });
      setThumbnailUpload(profile.data.avatar);
    };

    const loadTitle = async () => {
      const titleRes = await CodedraftsAdminSettingApi.getSettingByKey('title');
      settitle(titleRes.data.data);
    };

    if (isReady) {
      Promise.all([loadProfile(), loadTitle(), loadPaymentMethod()]).catch((error) => {
        toast.error(error?.response?.data?.message || 'Lỗi khi tải dữ liệu');
      });
    }
  }, [isReady]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      let thumbnail: string;
      if (thumbnailUpload instanceof File) {
        const uploadRes = await StudentApi.uploadFiles([thumbnailUpload]);
        // eslint-disable-next-line prefer-destructuring
        thumbnail = uploadRes.data.urls[0];
      } else {
        thumbnail = thumbnailUpload;
      }
      const foundItem = paymentMethod.find((item) => item.name === data.bankCode);

      await CodedraftsInstructorLessonApi.updateMe({
        avatar: thumbnail,
        bio: data.bio,
        facebook_url: data.facebook_url,
        linkedin_url: data.linkedin_url,
        title: data.title,
        twitter_url: data.twitter_url,
        username: data.username,
        youtube_url: data.youtube_url,
        bank_owner_name: data.bankOwnerName,
        bank_code: foundItem!.code,
        bank_number: data.bankNumber,
      });
      toast.success('Cập nhật thành công');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Cập nhật thất bại');
    }
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <p className="font-lexend-deca text-base font-normal text-[#4c4e64]">Ảnh đại diện</p>
          <RFHInputThumbnail
            name="file"
            thumbnailUpload={thumbnailUpload}
            setThumbnailUpload={setThumbnailUpload}
            hideCloseIcon
          />
          <InputRectangle
            name="username"
            label="Tên"
            placeholder="Nhập tên"
            type="string"
            noResize
            className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
          />
          <Grid display="flex" align="center">
            <Grid.Col span={6}>
              <InputRectangle
                name="email"
                label="Email"
                placeholder="Nhập email"
                type="string"
                noResize
                disabled
                className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <RHFSelect
                name="title"
                options={title?.values || []}
                label={'Chức danh'}
                placeholder="Chọn chức danh"
                type="text"
                noGap
                searchable
                rightSection={
                  <Image
                    className="cursor-pointer"
                    src="/svg/down-arrow.svg"
                    alt="arrow-down"
                    width={24}
                    height={24}
                  />
                }
                className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
              />
            </Grid.Col>
          </Grid>
          <RHFArea
            label="Bio"
            name="bio"
            placeholder="Viết bio của bạn"
            sx={{
              '& .mantine-Input-input': {
                height: '110px',
              },
            }}
            className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
          />
          <p className="font-lexend-deca text-base font-normal text-[#4c4e64]">
            Tài khoản mạng xã hội
          </p>
          <div className="flex flex-col gap-2">
            {socialSettings.map((item) => (
              <div key={item.name} className="flex w-full items-center">
                <Image src={item.icon} alt={item.name} width={44} height={44} className="mr-2" />
                <InputRectangle
                  key={item.name}
                  name={item.name}
                  placeholder="Liên kết đến trang cá nhân"
                  type="string"
                  noResize
                  className="w-[1320px] font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
                />
              </div>
            ))}
          </div>
          <InputRectangle
            name="bankNumber"
            label="Số tài khoản ngân hàng"
            placeholder="Nhập số tài khoản ngân hàng"
            type="number"
            noResize
            className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
          />
          <RHFSelect
            options={paymentMethod.map((item) => item.name)}
            name="bankCode"
            label="Ngân hàng thụ hưởng"
            placeholder="Nhập ngân hàng thụ hưởng"
            type="string"
            noResize
            rightSection={
              <Image
                className="cursor-pointer"
                src="/svg/down-arrow.svg"
                alt="arrow-down"
                width={24}
                height={24}
              />
            }
            paymentList={paymentMethod}
            className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
            haveIcon
            searchable
            nothingFound="Không tìm thấy ngân hàng"
          />

          <InputRectangle
            name="bankOwnerName"
            label="Tên chủ tài khoản"
            placeholder="Nhập tên chủ tài khoản(Viết hoa không dấu, không chứa ký tự đặc biệt)"
            type="string"
            noResize
            className="font-lexend-deca text-base font-light leading-6 text-[#4C4E64]"
          />

          <div className="mb-14 mt-5 flex justify-center">
            <PrimaryButton type="submit" className="w-[100px]" text="Lưu" />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default Profile;
