import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import CodeSmoothAdminApi from '@/api/admin/setting';
import { RHFMutiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';

import { CodeSmoothApi } from '../../../api/codesmooth-api';
import CodeSmoothInstructorCourseApi from '../../../api/instructor/course';
import { InputRectangle, InputRounded, RFHInputThumbnail } from '../../../common/Input';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import { requireAuth } from '../../../components/requireAuth';
import Footer from '../../../layouts/Footer';
import { listInstructorSidebarItem } from '../../../layouts/Instructor/Instructor';
import HeaderManage from '../../../layouts/Manage/Header';
import SidebarManage from '../../../layouts/Manage/Sidebar';

type FormValuesProps = {
  file: string;
  name: string;
  price: string;
  description: string;
  short_description: string;
  target_audience: string;
  feedbackEmail: string;
};

const CreateCouse: React.FC = () => {
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [optionSetting, setOptionSetting] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [id, setId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const CourseSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên khóa học'),
    price: Yup.string().required('Vui lòng nhập giá khóa học'),
    description: Yup.string().required('Vui lòng nhập mô tả khóa học'),
    short_description: Yup.string().required('Vui lòng nhập mô tả ngắn khóa học'),
    target_audience: Yup.string().required('Vui lòng nhập đối tượng khóa học'),
    feedbackEmail: Yup.string()
      .required('Vui lòng nhập email')
      .email('Vui lòng nhập đúng định dạng email'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CourseSchema),
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    let thumbnail: string;
    if (!thumbnailUpload) {
      setError('file', {
        type: 'manual',
        message: 'Vui lòng chọn ảnh',
      });
      return;
    }
    if (thumbnailUpload instanceof File) {
      const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload]);

      // eslint-disable-next-line prefer-destructuring
      thumbnail = uploadRes.data.urls[0];
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
      const update = {
        name: data.name,
        price: Number(data.price),
        category_ids: cats,
        description: data.description,
        short_description: data.short_description,
        feedback_email: data.feedbackEmail,
        requirements,
        target_audience: data.target_audience,
        thumbnail,
        objectives,
      };
      if (!id) {
        await CodeSmoothInstructorCourseApi.createCourse(update);
      } else {
        await CodeSmoothInstructorCourseApi.updateCourse(Number(id), update);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      if (router.isReady) {
        const { id } = router.query;
        if (id) {
          setId(id as string);
          const r = await CodeSmoothApi.Instructor.Course.getCourseById(Number(id));
          setObjectives(r.data.data.objectives);
          setRequirements(r.data.data.requirements);
          setOptionSetting(r.data.data.categories.map((item) => item.name));

          reset({
            description: r.data.data.description,
            feedbackEmail: r.data.data.feedback_email,
            name: r.data.data.name,
            // objectives: r.data.data.objectives,
            // requirements: r.data.data.requirements,
            short_description: r.data.data.short_description,
            target_audience: r.data.data.target_audience,
            price: r.data.data.price.toString(),
            // categories: r.data.data.categories.map((c) => c.name),
          });

          setThumbnailUpload(r.data.data.thumbnail);
        }
        setIsLoading(false);
      }
    };
    const handleGetSetting = async () => {
      try {
        const res = await CodeSmoothAdminApi.getCateSetting();
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
              <Link href={`/instructor/course/${id}`}>
                <PrimaryOutlineButton
                  className="border-none px-0 hover:bg-white"
                  textHoverClassName="text-[#013F9E]"
                  text="Xem trước"
                />
              </Link>
              {id ? (
                <>
                  <PrimaryOutlineButton
                    textHoverClassName="text-[#013F9E] px-0"
                    className="border-none hover:bg-white"
                    text="Huỷ bỏ"
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
                  text="TẠO"
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
              name="description"
              label="Mô tả *"
              maxLength={800}
              placeholder="Nhập mô tả khóa học"
              type="text"
              minRows={10}
            />
            <InputRectangle
              name="short_description"
              label="Mô tả ngắn *"
              maxLength={300}
              placeholder="Nhập mô tả ngắn khóa học"
              type="text"
              minRows={10}
            />
            <Link href={`/instructor/course/${id}/lesson-editor`} className="flex justify-center">
              <PrimaryOutlineButton className="w-fit" text="CHỈNH SỬA BÀI HỌC" />
            </Link>
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
              placeholder="Người học sẽ học được gì khi hoàn thành khóa học ? (Ấn để thêm)"
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
              placeholder="Người học cần có những gì để có thể học khóa học này ? (Ấn để thêm)"
              type="text"
              isMulti
            />
            <InputRectangle
              name="target_audience"
              label={'Đối tượng khóa học *'}
              maxLength={200}
              placeholder="Khóa học này dành cho những đối tượng nào ? (Ấn để thêm)"
              type="text"
            />
            <InputRectangle
              name="feedbackEmail"
              label="Feedback Email"
              placeholder="Nhập email"
              type="text"
            />
            <div className="mt-6 flex flex-col items-center gap-10">
              <div className="flex items-center gap-12">
                <PrimaryButton
                  onClick={async () => {
                    await CodeSmoothInstructorCourseApi.deleteCourse(Number(id));
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
        <Footer />
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
