import { yupResolver } from '@hookform/resolvers/yup';
import { map } from 'lodash';
import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import type { CourseCategory } from '@/api/admin/setting';
import CodeSmoothAdminApi from '@/api/admin/setting';
import { RHFMutiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PATH_AUTH } from '@/routes/path';

import { CodeSmoothApi } from '../../../api/codesmooth-api';
import { useAppDispatch } from '../../../app/hooks';
import { InputRectangle, InputRounded, RFHInputThumbnail } from '../../../common/Input';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import { InstructorLayout } from '../../../layouts/Instructor/Instructor';

type FormValuesProps = {
  file: string | File;
  name: string;
  price: string;
  description: string;
  short_description: string;
  categories: string[];
  objectives: string[];
  requirements: string[];
  target_audience: string;
  feedbackEmail: string;
};

const CreateCouse: React.FC = () => {
  const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const dispatch = useAppDispatch();
  const [optionSetting, setOptionSetting] = useState<CourseCategory[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<any>({});

  const router = useRouter();

  const CourseSchema = Yup.object().shape({
    file: Yup.string().required('Vui lòng chọn ảnh'),
    name: Yup.string().required('Vui lòng nhập tên khóa học'),
    price: Yup.string().required('Vui lòng nhập giá khóa học'),
    description: Yup.string().required('Vui lòng nhập mô tả khóa học'),
    short_description: Yup.string().required('Vui lòng nhập mô tả ngắn khóa học'),
    categories: Yup.array().min(1, 'Vui lòng chọn kỹ năng'),
    objectives: Yup.array().min(1, 'Vui lòng nhập mục tiêu khóa học'),
    requirements: Yup.array().required('Vui lòng nhập yêu cầu khóa học'),
    target_audience: Yup.string().required('Vui lòng nhập đối tượng khóa học'),
    feedbackEmail: Yup.string()
      .required('Vui lòng nhập email')
      .email('Vui lòng nhập đúng định dạng email'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CourseSchema),
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    let thumbnail: string;
    if (thumbnailUpload instanceof File) {
      const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload]);

      // eslint-disable-next-line prefer-destructuring
      thumbnail = uploadRes.data.urls[0];
    } else {
      thumbnail = thumbnailUpload;
    }
    const cats = optionSetting
      .filter((c) => {
        return data.categories.includes(c.name);
      })
      .map((item) => {
        return item.id;
      });

    try {
      await CodeSmoothApi.saveCourse({
        name: data.name,
        price: Number(data.price),
        category_ids: cats,
        description: data.description,
        short_description: data.short_description,
        feedback_email: data.feedbackEmail,
        requirements: data.requirements,
        target_audience: data.target_audience,
        thumbnail,
        objectives: data.objectives,
      });
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
          setIsDraft(true);
          const r = await CodeSmoothApi.Instructor.Course.getCourseById(Number(id));

          console.log(r.data.data.requirements);

          reset({
            description: r.data.data.description,
            feedbackEmail: r.data.data.feedback_email,
            name: r.data.data.name,
            objectives: r.data.data.objectives,
            requirements: r.data.data.requirements,
            short_description: r.data.data.short_description,
            target_audience: r.data.data.target_audience,
            price: r.data.data.price.toString(),
            categories: r.data.data.categories.map((c) => c.name),
          });

          setThumbnailUpload(r.data.data.thumbnail);
        }
        setIsLoading(false);
      }
    };
    const handleGetSetting = async () => {
      try {
        const res = await CodeSmoothAdminApi.getCateSetting();
        setOptionSetting(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetSetting();

    loadCourse();
  }, [router.isReady]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <InstructorLayout>
        <div className="flex flex-1 flex-col gap-[15px] px-[300px] py-[60px] font-lexend-deca leading-6 text-light-text-primary">
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
          <div className="flex justify-center">
            <PrimaryOutlineButton className="w-fit" text="CHỈNH SỬA BÀI HỌC" />
          </div>
          <RHFMutiSelect
            name="categories"
            options={map(optionSetting, (item) => item.name) || []}
            label={'Các kĩ năng *'}
            placeholder="Những kĩ năng nào sẽ được nói tới trong khóa học ? (Ấn để thêm)"
            type="text"
            isMulti
          />
          <RHFMutiSelect
            options={[]}
            name="objectives"
            label={'Mục tiêu khóa học *'}
            maxLength={200}
            placeholder="Người học sẽ học được gì khi hoàn thành khóa học ? (Ấn để thêm)"
            type="text"
            isMulti
          />
          <RHFMutiSelect
            options={[]}
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
              {isDraft ? (
                <PrimaryOutlineButton className="w-fit px-[30px] py-[9px]" text="HỦY BỎ" />
              ) : (
                <PrimaryButton
                  className="w-fit px-[30px] py-[9px]"
                  text="TẠO"
                  textClassName="text-white"
                />
              )}
              <PrimaryOutlineButton
                className="w-fit border-red-500 px-[30px] py-[8.5px]"
                text="XÓA"
                textClassName="text-red-500"
                bgHoverColor="hover:bg-red-500 hover:bg-opacity-10"
              />
            </div>
          </div>
        </div>
      </InstructorLayout>
    </FormProvider>
  );
};

export default CreateCouse;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_AUTH.login,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}
