import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ToastContentProps } from 'react-toastify';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { RHFMutiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';

import type { BaseResponse } from '../../../api/baseHttp';
import { StudentApi } from '../../../api/codedrafts-api';
import CodedraftsInstructorCourseApi from '../../../api/instructor/course';
import { InputRectangle, InputRounded, RFHInputThumbnail } from '../../../common/Input';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import { requireAuth } from '../../../components/requireAuth';
import { listInstructorSidebarItem } from '../../../layouts/Instructor/Instructor';
import HeaderManage from '../../../layouts/Manage/Header';
import SidebarManage from '../../../layouts/Manage/Sidebar';
import { TOAST_CONFIG } from '../../../shared/constants/app';
import { CourseLevel, CourseTargetAudience } from '../../../shared/enum/course';
import { toastGetErrorMessage } from '../../../utils/app';

type FormValuesProps = {
  file: string;
  name: string;
  price: string;
  base_price: string;
  description: string;
  short_description: string;
  target_audience: string;
  feedbackEmail: string;
  level: CourseLevel;
  requirements: string[];
  objectives: string[];
  categories: string[];
  thumbnailUpload: File | string;
};

const CreateCouse: React.FC = () => {
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [optionSetting, setOptionSetting] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [parentCategories, setparentCategories] = useState<{ id: number; name: string }[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query;
  const CourseSchema1 = Yup.object().shape({});

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên khóa học'),
    price: Yup.string()
      .required('Vui lòng nhập giá khóa học')
      .min(0, 'Giá khóa học phải lớn hơn 0')
      .max(Yup.ref('base_price'), 'Giá khóa học phải nhỏ hơn giá gốc'),
    base_price: Yup.string().required('Vui lòng nhập giá gốc khóa học'),
    description: Yup.string().required('Vui lòng nhập mô tả khóa học'),
    short_description: Yup.string().required('Vui lòng nhập mô tả ngắn khóa học'),
    target_audience: Yup.string().required('Vui lòng nhập đối tượng khóa học'),
    level: Yup.string().required('Vui lòng nhập trình độ khóa học'),
    requirements: Yup.array().min(1, 'Vui lòng nhập ít nhất 1 yêu cầu'),
    thumbnailUpload: Yup.mixed().required('Vui lòng chọn ảnh'),
    objectives: Yup.array().min(1, 'Vui lòng nhập ít nhất 1 mục tiêu'),
    categories: Yup.array().min(1, 'Vui lòng chọn ít nhất 1 kĩ năng'),
    feedbackEmail: Yup.string()
      .required('Vui lòng nhập email')
      .email('Vui lòng nhập đúng định dạng email'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CourseSchema1),
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    let thumbnail: string;
    if (!thumbnailUpload) {
      setError('file', {
        type: 'manual',
        message: 'Vui lòng chọn ảnh',
      });
    }
    if (thumbnailUpload instanceof File) {
      const uploadRes = await StudentApi.uploadFiles([thumbnailUpload]);

      // eslint-disable-next-line prefer-destructuring
      thumbnail = uploadRes.data.urls[0] || '';
    } else {
      thumbnail = thumbnailUpload;
    }

    const cats = categories
      .filter((c) => {
        return optionSetting.includes(c.name);
      })
      .map((item) => {
        return item.id;
      });

    try {
      await CourseSchema.validate(
        { ...data, requirements, thumbnailUpload: thumbnail, objectives, categories: cats },
        {
          abortEarly: false,
        },
      );
    } catch (error: any) {
      error.inner.forEach((e) => {
        setError(e.path as keyof FormValuesProps, {
          type: 'manual',
          message: e.message,
        });
      });
      return;
    }

    const update = {
      name: data.name,
      price: Number(data.price),
      base_price: Number(data.base_price),
      category_ids: cats,
      description: data.description,
      short_description: data.short_description,
      feedback_email: data.feedbackEmail,
      requirements,
      target_audience: data.target_audience,
      thumbnail,
      objectives,
      level: data.level,
    };

    const r = await toast.promise(
      !id
        ? CodedraftsInstructorCourseApi.createCourse(update)
        : CodedraftsInstructorCourseApi.updateCourse(Number(id), update),
      {
        pending: 'Đang lưu khóa học...',
        success: 'Lưu khóa học thành công!',
        error: {
          render({ data }: ToastContentProps<BaseResponse>) {
            return toastGetErrorMessage(data);
          },
        },
      },
      TOAST_CONFIG,
    );

    if (!id) {
      router.query.id = r.data.data.course_id;
      router.push(router, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      if (router.isReady) {
        const { id } = router.query;
        if (id) {
          const r = await CodedraftsInstructorCourseApi.getCourseById(Number(id));
          setObjectives(r.data.data.objectives);
          setRequirements(r.data.data.requirements);
          setOptionSetting(r.data.data.categories.map((item) => item.name));

          reset({
            description: r.data.data.description,
            feedbackEmail: r.data.data.feedback_email,
            name: r.data.data.name,
            short_description: r.data.data.short_description,
            target_audience: r.data.data.target_audience,
            price: r.data.data.price.toString(),
            base_price: r.data.data.base_price.toString(),
            level: r.data.data.level,
          });

          setThumbnailUpload(r.data.data.thumbnail);
        }
      }
    };
    const handleGetSetting = async () => {
      try {
        const res = await StudentApi.getCategories();
        setCategories(res.data.data.map((item) => ({ id: item.id, name: item.name })));
      } catch (error) {
        console.log(error);
      }
    };
    handleGetSetting();

    loadCourse();
  }, [router.isReady]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderManage
          rightContent={
            <div className="flex items-center">
              <PrimaryOutlineButton
                className="border-none px-0 hover:bg-white"
                textHoverClassName="text-[#013F9E]"
                text="Xem trước"
                onClick={() => {
                  if (id) {
                    router.push(`/instructor/course/${id}`);
                  } else {
                    toast.error('Vui lòng tạo khóa học trước khi xem trước', TOAST_CONFIG);
                  }
                }}
              />
              {id ? (
                <>
                  <PrimaryOutlineButton
                    textHoverClassName="text-[#013F9E] px-0"
                    className="border-none hover:bg-white"
                    text="Hủy bỏ"
                    onClick={() => {
                      router.back();
                    }}
                  />
                  <PrimaryOutlineButton
                    bgHoverColor="hover:bg-light-primary"
                    className="w-fit px-[30px] py-[9px]"
                    textHoverClassName="text-[#ffffff]"
                    text="Cập nhật"
                    type="submit"
                  />
                </>
              ) : (
                <PrimaryButton
                  className="ml-4 h-[40px] w-fit px-5"
                  text="Tạo"
                  textClassName="text-white"
                  type="submit"
                />
              )}
            </div>
          }
        />
        <div className="flex w-full">
          <SidebarManage bottom items={listInstructorSidebarItem} redirectPath="instructor" />
          <div className="flex flex-1 flex-col gap-[15px] overflow-y-auto px-[300px] py-[60px] font-lexend-deca leading-6 text-light-text-primary">
            <RFHInputThumbnail
              name="file"
              thumbnailUpload={thumbnailUpload}
              setThumbnailUpload={setThumbnailUpload}
            />

            <InputRounded
              name="name"
              label="Tên khóa học *"
              maxLength={40}
              placeholder="Nhập tên khóa học"
              type="text"
              rightLabel="Tối đa 40 ký tự"
              noResize
            />
            <InputRectangle
              name="price"
              label="Giá khóa học *"
              maxLength={15}
              placeholder="Nhập giá khóa học"
              type="number"
              noResize
            />
            <InputRectangle
              name="base_price"
              label="Giá gốc khóa học *"
              maxLength={15}
              placeholder="Nhập giá gốc khóa học"
              type="number"
              noResize
            />
            <InputRectangle
              name="description"
              label="Mô tả *"
              maxLength={800}
              placeholder="Nhập mô tả khóa học"
              rightLabel="Tối đa 800 ký tự"
              type="text"
              minRows={10}
            />
            <InputRectangle
              name="short_description"
              label="Mô tả ngắn *"
              maxLength={300}
              placeholder="Nhập mô tả ngắn khóa học"
              rightLabel="Tối đa 300 ký tự"
              type="text"
              minRows={10}
            />
            <Link href={`/instructor/course/${id}/lesson-editor`} className="flex justify-center">
              <PrimaryOutlineButton className="w-fit" text="CHỈNH SỬA BÀI HỌC" />
            </Link>
            {/* TODO: Để sau/>}
            {/* <RHFMutiSelect
              name="parentCategories"
              options={parentCategories.map((item) => item.name)}
              setValue={setOptionSetting}
              value={optionSetting}
              label={'Kĩ năng chính *'}
              placeholder="Khóa học này sẽ nói về kĩ năng chính nào ? (Ấn để thêm)"
              type="text"
            /> */}
            <RHFMutiSelect
              name="level"
              options={Object.values(CourseLevel)}
              label={'Cấp độ *'}
              placeholder="Chọn cấp độ khóa học"
              type="text"
            />
            <RHFMutiSelect
              name="categories"
              options={categories.map((item) => item.name)}
              value={optionSetting}
              setValue={setOptionSetting}
              label={'Các kĩ năng *'}
              placeholder="Những kĩ năng nào sẽ được nói tới trong khóa học ? (Ấn để thêm)"
              type="text"
              isMulti
              creatable
            />
            <RHFMutiSelect
              options={objectives}
              value={objectives}
              setValue={setObjectives}
              name="objectives"
              label={'Mục tiêu khóa học *'}
              creatable
              maxLength={200}
              placeholder="Người học sẽ học được gì khi hoàn thành khóa học ? (Nhập và ấn để thêm)"
              type="text"
              isMulti
            />
            <RHFMutiSelect
              options={requirements}
              value={requirements}
              setValue={setRequirements}
              name="requirements"
              label={'Yêu cầu khóa học *'}
              maxLength={200}
              creatable
              placeholder="Người học cần có những gì để có thể học khóa học này ? (Nhập và ấn để thêm)"
              type="text"
              isMulti
            />
            <RHFMutiSelect
              name="target_audience"
              options={Object.values(CourseTargetAudience)}
              label={'Đối tượng khóa học *'}
              maxLength={200}
              placeholder="Khóa học này dành cho những đối tượng nào ? (Ấn để thêm)"
              type="text"
            />
            <InputRectangle
              name="feedbackEmail"
              label="Feedback Email *"
              placeholder="Nhập email"
              type="text"
            />
            <div className="mt-6 flex flex-col items-center gap-10">
              <div className="flex items-center gap-12">
                <PrimaryButton
                  onClick={async () => {
                    try {
                      toast.promise(
                        CodedraftsInstructorCourseApi.deleteCourse(Number(id)),
                        {
                          pending: 'Đang xóa khóa học...',
                          success: 'Xóa khóa học thành công',
                          error: {
                            render({ data }: any) {
                              return toastGetErrorMessage(data);
                            },
                          },
                        },
                        TOAST_CONFIG,
                      );
                    } catch (e) {
                      console.log(e);
                    }
                    router.replace('/instructor/course?selection=all');
                  }}
                  className="w-fit bg-red-600 px-[30px]"
                  text="XÓA KHÓA HỌC"
                  textClassName="text-white"
                  hoverBgColor="hover:bg-red-800"
                />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default CreateCouse;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
