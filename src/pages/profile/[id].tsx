import 'swiper/css';

import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import type { ListCourseItemResponse } from '@/api/instructor/course';
import CodedraftsInstructorCourseApi from '@/api/instructor/course';
import type { UserInfo } from '@/api/instructor/lesson';
import SwiperListCard from '@/components/home/SwiperListCard';
import { InstructorDetail } from '@/components/Profile/InstructorDetail';
import Header from '@/layouts/Header';
import HeaderPrimary from '@/layouts/HeaderPrimary';
import { toastGetErrorMessage } from '@/utils/app';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}

const Info = ({ session }) => {
  const [profile, setProfile] = React.useState<UserInfo>(Object);
  const [course, setCourse] = React.useState<ListCourseItemResponse[]>([]);

  const router = useRouter();
  const { isReady } = router;

  const { id } = router.query;

  useEffect(() => {
    const loadData = async () => {
      const profilePromise = CodedraftsInstructorCourseApi.getInstrutorInfo(String(id));
      const coursePromise = CodedraftsInstructorCourseApi.getInstrutorCourse(String(id));

      try {
        const [profileResponse, courseResponse] = await Promise.all([
          profilePromise,
          coursePromise,
        ]);
        setProfile(profileResponse.data.data);
        setCourse(courseResponse.data.data);
      } catch (error) {
        toastGetErrorMessage(error);
      }
    };

    if (isReady) {
      loadData();
    }
  }, [isReady]);

  return (
    <div>
      {session ? <HeaderPrimary /> : <Header />}
      <div className="mt-20 flex flex-col items-center justify-center gap-3">
        <InstructorDetail profile={profile} />
        <div className="flex w-[1480px] flex-col">
          <p className="font-lexend-deca text-2xl font-medium">Khóa học của tôi</p>
          <div className="my-2 h-1 w-7 bg-[#1363DF]" />
        </div>
        <SwiperListCard classSwiper="owner-carousel" courses={course} haveArrow={false} />
      </div>
    </div>
  );
};

export default Info;
