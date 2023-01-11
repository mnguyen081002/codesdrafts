import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { CodeSmoothApiResponseList, CourseResponse } from '../api/codesmooth-api';
import { CodeSmoothApi } from '../api/codesmooth-api';
import { useAppDispatch } from '../app/hooks';
import { resetLesson } from '../features/auth/LessonSlice';
import { generateId } from '../utils/genId';
import SmallCourseCard from './SmallCourseCard';

const Teach = () => {
  const [listCourses, setListCourses] = useState<CodeSmoothApiResponseList<CourseResponse>>({
    data: [],
    message: '',
    meta: {
      hasNextPage: false,
      hasPreviousPage: false,
      page: 0,
      itemCount: 0,
      pageCount: 0,
      take: 0,
    },
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    CodeSmoothApi.getListCourses()
      .then((data) => {
        setListCourses(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    dispatch(resetLesson());
  }, []);

  return (
    <>
      <div className="mt-16 grid grid-cols-5 flex-wrap items-center justify-center gap-5 px-7">
        <Link
          href={`/editcourse/${generateId(18)}`}
          className="flex h-[370px] w-72 cursor-pointer flex-col items-center justify-center rounded border border-gray-200 bg-gray-200 duration-500 hover:shadow-lg"
        >
          <div className="flex flex-col items-center">
            <AddIcon style={{ fontSize: '100px' }} />
            <p>Create New Course</p>
          </div>
        </Link>
        {isLoading
          ? [...Array(9)].map((item) => {
              return <SmallCourseCard isLoading={true} key={item} />;
            })
          : listCourses.data.map((course: CourseResponse) => {
              return (
                <SmallCourseCard
                  isLoading={isLoading}
                  author="Code Smooth"
                  author_avatar="./logo-96.png"
                  completed_percent={30}
                  summary={course.summary}
                  id={course.id!}
                  thumbnail={course.thumbnail}
                  name={course.name}
                  key={course.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default Teach;
