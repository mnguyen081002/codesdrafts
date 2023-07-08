import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import { map } from 'lodash';
import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import type { CourseSetting } from '@/api/admin/setting';
import CodeSmoothAdminApi from '@/api/admin/setting';
import { RHFMutiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PATH_AUTH } from '@/routes/path';

import type { CourseResponse } from '../../../api/codesmooth-api';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import { useAppDispatch } from '../../../app/hooks';
import { InputRectangle, InputRounded, RFHInputThumbnail } from '../../../common/Input';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import { InstructorLayout } from '../../../layouts/Instructor/Instructor';
import { defaultCourse } from '../../editcourse/[id]';

type FormValuesProps = {
  file: string;
  nameCourse: string;
  valueCourse: string;
  desCourse?: string;
  shortDesCourse: string;
  skills: string[];
  PurCourse: string;
  ReqCourse: string[];
  ObjCourse: string;
  feedbackEmail: string;
};

const CreateCouse: React.FC = () => {
  const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const dispatch = useAppDispatch();
  const [optionSetting, setOptionSetting] = useState<CourseSetting[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requiredOptions, setRequiredOptions] = useState<string[]>([]);

  const [course, setCourse] = useState<CourseResponse>(defaultCourse);
  const router = useRouter();
  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      if (router.isReady) {
        const { id, draft } = router.query;
        if (draft) {
          setIsDraft(true);
          const data = await CodeSmoothApi.getCourseById(Number(id));
          setCourse(data.data);
          // const query = '';
          // if (data.data.category.length > 0 && data.data.category[0]?.lessons?.length! > 0) {
          //   query = `${data.data.category[0]?.lessons[0]?.id!}?draft=true`;
          // } else {
          //   query = generateId(18).toString();
          // }
          // setQueryLessonPage(query);
        } else {
          // setQueryLessonPage(generateId(18).toString());
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

  const defaultValues = {
    file: '',
    nameCourse: '',
    valueCourse: '',
    desCourse: '',
    shortDesCourse: '',
    skills: [],
    PurCourse: '',
    ReqCourse: [],
    ObjCourse: '',
    feedbackEmail: '',
  };

  const CourseSchema = Yup.object().shape({
    file: Yup.string().required('Vui lòng chọn ảnh'),
    nameCourse: Yup.string().required('Vui lòng nhập tên khóa học'),
    valueCourse: Yup.string().required('Vui lòng nhập giá khóa học'),
    desCourse: Yup.string().required('Vui lòng nhập mô tả khóa học'),
    shortDesCourse: Yup.string().required('Vui lòng nhập mô tả ngắn khóa học'),
    skills: Yup.array().min(1, 'Vui lòng chọn kỹ năng'),
    PurCourse: Yup.string().min(1, 'Vui lòng nhập mục tiêu khóa học'),
    ReqCourse: Yup.array().required('Vui lòng nhập yêu cầu khóa học'),
    ObjCourse: Yup.string().required('Vui lòng nhập đối tượng khóa học'),
    feedbackEmail: Yup.string()
      .required('Vui lòng nhập email')
      .email('Vui lòng nhập đúng định dạng email'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CourseSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload!]);
    console.log(uploadRes.data.urls[0]);

    const passSkill = map(optionSetting, (item) => {
      if (data.skills.includes(item.name)) {
        return Number(item.id);
      }
      return null;
    });
    try {
      CodeSmoothApi.saveCourse({
        name: data.nameCourse,
        price: Number(data.valueCourse),
        category_ids: passSkill as number[],
        description: data.desCourse as string,
        short_description: data.shortDesCourse,
        feedback_email: data.feedbackEmail,
        requirements: data.ReqCourse,
        target_audience: data.ObjCourse,
        thumbnail: uploadRes.data.urls[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            name="nameCourse"
            label="Tên khóa học *"
            maxLength={40}
            placeholder="Nhập tên khóa học"
            type="text"
            rightLabel="Tối đa 40 ký tự"
          />
          <InputRectangle
            name="valueCourse"
            label="Giá khóa học *"
            maxLength={15}
            placeholder="Nhập giá khóa học"
            type="number"
            noResize
          />
          <InputRectangle
            name="desCourse"
            label="Mô tả *"
            maxLength={500}
            placeholder="Nhập mô tả khóa học"
            type="text"
            className="pb-32"
          />
          <InputRectangle
            name="shortDesCourse"
            label="Mô tả ngắn *"
            maxLength={200}
            placeholder="Nhập mô tả ngắn khóa học"
            type="text"
            className="pb-32"
          />
          <div className="flex justify-center">
            <PrimaryOutlineButton className="w-fit" text="CHỈNH SỬA BÀI HỌC" />
          </div>
          <RHFMutiSelect
            name="skills"
            options={map(optionSetting, (item) => item.name) || []}
            label={'Các kĩ năng *'}
            placeholder="Những kĩ năng nào sẽ được nói tới trong khóa học ? (Ấn Enter để thêm)"
            type="text"
            isMulti
          />

          <InputRectangle
            name="PurCourse"
            label={'Mục tiêu khóa học *'}
            maxLength={200}
            placeholder="Người học sẽ học được gì khi hoàn thành khóa học ?"
            type="text"
          />
          <RHFMutiSelect
            options={requiredOptions}
            setOptions={setRequiredOptions}
            name="ReqCourse"
            label={'Yêu cầu khóa học *'}
            maxLength={200}
            creatable
            placeholder="Người học cần có những gì để có thể học khóa học này ? (Ấn Enter để thêm)"
            type="text"
            isMulti
          />
          <InputRectangle
            name="ObjCourse"
            label={'Đối tượng khóa học *'}
            maxLength={200}
            placeholder="Khóa học này dành cho những đối tượng nào ? (Ấn Enter để thêm)"
            type="text"
          />
          <InputRectangle
            name="feedbackEmail"
            label="Feedback Email"
            placeholder="Nhập email"
            type="text"
          />
          <Button className="w-fit bg-yellow-200" type="submit">
            Dô
          </Button>

          <div className="mt-6 flex flex-col items-center gap-10">
            <div className="flex items-center gap-12">
              <PrimaryOutlineButton className="w-fit" text="HỦY BỎ" />
              <PrimaryButton
                className="w-fit bg-red-600"
                hoverBgColor="hover:bg-red-700"
                text="XÓA"
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
