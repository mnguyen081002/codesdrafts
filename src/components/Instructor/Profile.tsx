import { Grid } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import type { SettingResponse } from '@/api/admin/setting';
import CodedraftsAdminSettingApi from '@/api/admin/setting';
import { StudentApi } from '@/api/codedrafts-api';
import CodedraftsInstructorLessonApi from '@/api/instructor/lesson';
import { InputRectangle, RFHInputThumbnail } from '@/common/Input';

import { PrimaryButton } from '../Button';
import { RHFMutiSelect } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';
import RHFArea from '../hook-form/RHFArea';

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

const Profile = () => {
  const { isReady } = useRouter();

  const [thumbnailUpload, setThumbnailUpload] = useState<any>();

  const methods = useForm<FormValuesProps>({});

  const { reset, handleSubmit, setError } = methods;
  const [title, settitle] = useState<SettingResponse>();

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await CodedraftsInstructorLessonApi.getMe();

      reset({
        username: profile.data.username,
        bio: profile.data.bio,
        email: profile.data.email,
        title: profile.data.title || '',
        facebook_url: profile.data.facebook_url,
        twitter_url: profile.data.twitter_url,
        linkedin_url: profile.data.linkedin_url,
        youtube_url: profile.data.youtube_url,
      });
      setThumbnailUpload(profile.data.avatar);
    };
    const loadTitle = async () => {
      const titleRes = await CodedraftsAdminSettingApi.getSettingByKey('title');
      settitle(titleRes.data.data);
    };

    if (isReady) {
      loadProfile();
      loadTitle();
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
      await CodedraftsInstructorLessonApi.updateMe({
        avatar: thumbnail,
        bio: data.bio,
        facebook_url: data.facebook_url,
        linkedin_url: data.linkedin_url,
        title: data.title,
        twitter_url: data.twitter_url,
        username: data.username,
        youtube_url: data.youtube_url,
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
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <RHFMutiSelect
                name="title"
                options={title?.values || []}
                label={'Chức danh'}
                placeholder="Chọn chức danh"
                type="text"
                noGap
                rightSection={
                  <Image src="/svg/down-arrow.svg" alt="arrow-down" width={24} height={24} />
                }
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
                  className="w-[1320px]"
                />
              </div>
            ))}
          </div>
          <div className="mb-4 flex justify-center">
            <PrimaryButton type="submit" className="w-[100px]" text="Lưu" />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default Profile;
