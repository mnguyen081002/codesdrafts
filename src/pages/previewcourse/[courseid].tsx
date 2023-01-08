import {
  ArticleOutlined,
  CheckCircleOutlineOutlined,
  CheckOutlined,
  ClassOutlined,
  LayersOutlined,
  LocalFireDepartmentOutlined,
  RadioButtonUncheckedOutlined,
  WatchLaterOutlined,
  WorkspacePremiumOutlined,
} from '@mui/icons-material';
import { Checkbox, Rating } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { CategoryResponse, CourseResponse } from '../../api/codesmooth-api';
import { CodeSmoothApi } from '../../api/codesmooth-api';
import Button from '../../common/Button';
import { CoureTag } from '../../components/Course/CourseTag';
import CourseSkeleton from '../../components/Skeleton/CourseSkeleton';
import { Meta } from '../../layouts/Meta';
import { Main } from '../../templates/Main';

interface CourseWillLearnItemProps {
  title: string;
  isDone: boolean;
}

const CourseWillLearnItem: FC<CourseWillLearnItemProps> = (props) => {
  return (
    <div className="flex items-center justify-start gap-1">
      <CheckOutlined className="text-lg" />
      <div className=" overflow-hidden text-ellipsis transition">{props.title}</div>
    </div>
  );
};

interface CourseListLessonItemProps {
  lesson: {
    id: number;
    title: string;
  };
}

const CourseListLessonItem: FC<CourseListLessonItemProps> = (props) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-300">
      <Checkbox
        disabled
        icon={<RadioButtonUncheckedOutlined />}
        checkedIcon={<CheckCircleOutlineOutlined className="text-light-primary" />}
      />
      <span className="py-2 text-base font-normal">{props.lesson.title}</span>
    </div>
  );
};

interface CourseContentListProps {
  categories: CategoryResponse[];
}

const CourseContentList: FC<CourseContentListProps> = (props) => {
  return (
    <div className="flex w-full flex-col  py-2 px-3 text-lg font-semibold">
      {props.categories.map((category, index) => (
        <div key={category.id}>
          <p className="border-b border-slate-300 p-4">{`${index + 1}. ${category.title}`}</p>

          <div key={index} className="my-4 flex flex-col">
            {category.lessons.map((lesson, index) => (
              <CourseListLessonItem key={index} lesson={lesson} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PreviewCourse = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseResponse>();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;
    const { courseid } = router.query;
    const fetchCourseHandler = async () => {
      const courseRes = await CodeSmoothApi.getCourseById(Number(courseid));
      setCourse(courseRes.data);
      setIsLoaded(true);
    };

    fetchCourseHandler();
  }, [router.isReady]);

  return (
    <Main
      headerChildren={
        <div className="flex flex-1 justify-end px-10">
          <Link href={`/editcourse/${course?.id}/?draft=true`}>
            <Button text="Edit" className="bg-light-primary px-4 font-semibold text-white" />
          </Link>
        </div>
      }
      meta={<Meta title={course?.id.toString() || ''} description="Lorem ipsum" />}
    >
      {isLoaded ? (
        <div className="mt-10 flex w-full justify-center">
          <div className="flex w-[65%] flex-row">
            <div className="w-[70%]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="line-clamp mb-4 w-[80%] overflow-hidden break-words text-4xl font-bold leading-tight">
                    {course?.name}
                  </span>
                </div>
                <div className="flex justify-start gap-4">
                  <CoureTag
                    title={`14 Bài học`}
                    icon={<ClassOutlined className="text-light-primary" />}
                  />
                  <CoureTag
                    title={`5 Câu hỏi`}
                    icon={<ArticleOutlined className="text-light-primary" />}
                  />
                  <CoureTag
                    title={`5 Thử thách`}
                    icon={<LocalFireDepartmentOutlined className="text-light-primary" />}
                  />
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <Rating className="text-yellow-300" precision={0.5} readOnly value={4.5} />
                  <span className="text-lg font-semibold leading-5">4.5</span>
                  <span className="text-sm text-light-text-primary">203.321 ratings</span>
                </div>
                <div>
                  <p className="pt-8 text-2xl font-bold">Tổng Quan Khóa Học</p>
                  <div
                    className={`line-clamp h-20 w-full overflow-hidden text-ellipsis py-2 transition`}
                  >
                    {course?.summary}
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-normal border border-slate-300 py-4 px-6">
                <p className=" text-2xl font-bold">Những gì bạn sẽ được học</p>
                <div className="mt-4 grid grid-cols-2 justify-between gap-2">
                  {course?.will_learns.map((w, index) => (
                    <CourseWillLearnItem key={index} isDone={true} title={w} />
                  ))}
                </div>
              </div>
              <div>
                <p className="pt-8 pb-4 text-2xl font-bold">Nội dung khóa học</p>
                <div className="flex justify-between">
                  <CourseContentList categories={course?.category!} />
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="ml-8 shadow-md">
                <div>
                  <img
                    alt="course-thumbnail"
                    src={course?.thumbnail}
                    className="h-44 w-full bg-gray-400 object-fill"
                  />
                </div>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="p-2 text-lg font-semibold">Miễn phí</div>
                  <Button
                    text="Đăng ký học ngay"
                    className="h-12 bg-light-primary px-16 text-lg font-semibold text-white"
                  ></Button>
                  <div className="mt-8 flex w-72 flex-col items-start gap-2">
                    <div className="flex items-center">
                      <LayersOutlined className="text-lg text-light-primary" />
                      <span className="ml-2">Trình độ cơ bản</span>
                    </div>
                    <div className="flex items-center">
                      <WatchLaterOutlined className="text-lg text-light-primary" />
                      <span className="ml-2">10 giờ học</span>
                    </div>
                    <div className="flex items-center">
                      <WorkspacePremiumOutlined className="text-lg text-light-primary" />
                      <span className="ml-2"> Giấy chứng nhận khi hoàn thành</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CourseSkeleton />
      )}
    </Main>
  );
};

export default PreviewCourse;
