import { Rating } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

import type { ActionReviewRequest, ReviewResponse } from '@/api/codedrafts-api';
import { StudentApi } from '@/api/codedrafts-api';
import DisLikeIcon from '@/common/Icons/DislikeIcon';
import LikeIcon from '@/common/Icons/LikeIcon';
import { CommonLoading } from '@/layouts/Checkout/CheckoutComplete';
import { convertTime } from '@/utils/app';

import type { BaseGetCourseByIDResponse } from '../api/base/interface/course';
import { PrimaryOutlineButton } from './Button';
import CourseUnderlineNavBar from './Instructor/UnderlineNavBar';
import {
  CourseDetailSection,
  CourseDetailSectionTitle,
} from './Student/CourseDetail/CourseDetailSection';
import CourseSubInfo from './Student/CourseDetail/CourseSubInfo';
import { Avatar } from './sub/avatar';
import CourseDetailTableOfContent from './sub/CourseDetailTableOfContent';
import CustomRating from './sub/CustomRating';

interface CourseDetailMainProps {
  course: BaseGetCourseByIDResponse;
  absoluteCourseInfo: React.ReactNode;
}

interface CourseOverviewProps {
  course: BaseGetCourseByIDResponse;
}

const OverView = (props: CourseOverviewProps) => {
  return (
    <>
      <p className="font-lexend-deca text-base font-light leading-8 text-light-text-primary">
        {props.course?.description}
      </p>
      <CourseDetailSection
        contents={props.course?.objectives}
        title="Bạn sẽ học được gì?"
        text="Trong khóa học này bạn sẽ học được những kiến thức và kỹ năng sau."
      />
      <CourseDetailSection
        contents={props.course?.requirements}
        title="Yêu cầu"
        text="Cần một số yêu cầu cần thiết để bạn có thể hoàn thành khóa học này."
      />
      <CourseDetailSectionTitle title={'Nội dung giảng dạy'} text={''} noUnderline />
      <CourseDetailTableOfContent
        data={props.course.sections.map((s) => {
          return {
            title: s.title,
            contents: s.lessons.map((l) => {
              return l.title;
            }),
          };
        })}
      />
    </>
  );
};

type PropReviews = {
  course_id: number;
  isVisible: boolean;
};

type EleReviewProps = {
  review: ReviewResponse;
};

const EleReview = (props: EleReviewProps) => {
  const [likeCount, setLikeCount] = useState(props.review.like_count);
  const [dislikeCount, setDislikeCount] = useState(props.review.dislike_count);
  const [isLiked, setIsLiked] = useState(props.review.is_like);
  const [isDisliked, setIsDisliked] = useState(props.review.is_dislike);

  const ActionReview = async ({ review_id, action }: ActionReviewRequest) => {
    try {
      if (action === 'like') {
        if (isLiked) {
          return;
        }
        await StudentApi.actionReview({ review_id, action });
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
        setDislikeCount((prev) => prev - 1);
        setIsDisliked(false);
        return;
      }

      if (isDisliked) {
        return;
      }

      await StudentApi.actionReview({ review_id, action });
      setLikeCount((prev) => prev - 1);
      setDislikeCount((prev) => prev + 1);
      setIsDisliked(true);
      setIsLiked(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error('Vui lòng đăng nhập');
      }
      console.error('Error action review:', error);
    }
  };

  return (
    <div>
      <div className="my-5 flex items-center gap-4">
        <Avatar url={props.review.user.avatar || ''} w={60} h={60} />
        <div className="flex flex-col justify-start gap-2">
          <p className="font-lexend-deca text-[18px] font-normal leading-[22px] text-black">
            {props.review.user.username}
          </p>
          <Rating value={props.review.rating} />
        </div>
      </div>
      <p className="text-lg font-light text-[#4c4e64]">{props.review.comment}</p>
      <div className="flex items-center">
        <p className="text-base font-light text-[#79797D]">Hữu ích?</p>
        <div className="flex items-center">
          <div className="mx-5 flex items-center gap-[6px]">
            <LikeIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => {
                ActionReview({ review_id: props.review.id, action: 'like' });
              }}
              pathFill={`${isLiked ? '#0014ee' : '#4c4e64'}`}
            />
            {likeCount === 0 ? (
              <span></span>
            ) : (
              <span className="font-lexend-deca text-sm font-normal text-[#4c4e64]">
                {likeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-[6px]">
            <DisLikeIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => {
                ActionReview({ review_id: props.review.id, action: 'dislike' });
              }}
              pathFill={`${isDisliked ? '#0014ee' : '#4c4e64'}`}
            />
            {dislikeCount === 0 ? (
              <span></span>
            ) : (
              <span className="font-lexend-deca text-sm font-normal text-[#4c4e64]">
                {dislikeCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListReviews = ({ course_id, isVisible }: PropReviews) => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [page, setPage] = useState(0);
  const limit = 5;

  const loadMoreReviews = async () => {
    try {
      const response = await StudentApi.getListReviews({
        course_id,
        limit,
        page: page + 1,
      });

      const newReviews = response.data.data;
      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading more reviews:', error);
    }
  };

  useEffect(() => {
    loadMoreReviews();
  }, [page === 0]);

  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${isVisible ? 'block' : 'hidden'}`}
      id="scrollableDiv"
      style={{
        height: 800,
        overflow: 'auto',
        width: '100%',
      }}
    >
      <InfiniteScroll
        dataLength={
          reviews.length // This is important field to render the next data
        }
        next={loadMoreReviews}
        hasMore={true}
        loader={reviews.length !== 0 && <CommonLoading />}
        scrollableTarget="scrollableDiv"
      >
        {reviews.map((review) => (
          <EleReview key={review.id} review={review} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

function CourseDetailMain(props: CourseDetailMainProps) {
  const router = useRouter();
  const selection = router.query.selection as string;
  return (
    <div className="h-fit w-full font-lexend-deca">
      <div className="relative flex w-full flex-col justify-start gap-[20px] bg-[#041734] py-[70px] pl-[320px] pr-[560px]">
        <p className="w-fit rounded-3xl bg-[#1CCC19] py-1 px-3 font-lexend-deca font-semibold text-white">
          {props.course?.main_category.name}
        </p>
        <p className="font-lexend-deca text-[46px] font-semibold capitalize text-white">
          {props.course?.name}
        </p>
        <p className="font-lexend-deca text-lg font-normal text-[#B2BDCD]">
          {props.course?.short_description}
        </p>
        <div className="flex items-center gap-[25px]">
          <div className="flex items-center gap-[9px]">
            <Link
              href={`/profile/${props.course?.owner.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar url={props.course?.owner.avatar} w={60} h={60} />
            </Link>
            <div className="flex h-[43px] w-[260px] flex-col justify-start gap-[9px]">
              <p className="font-inter text-2xl font-semibold leading-5 text-white opacity-[87%]">
                {props.course?.owner.username}
              </p>
              <p className="font-inter text-lg font-normal leading-5 tracking-[0.15px] text-white opacity-[68%]">
                Google Expert
              </p>
            </div>
          </div>
          <CourseSubInfo icon="/images/course/File.svg" text="19" />
          <CourseSubInfo
            icon="/images/course/Clock.svg"
            text={convertTime(props.course?.reading_time)}
          />
          <CourseSubInfo
            icon="/images/course/People.svg"
            text={props.course?.total_enrollment.toString()}
          />
          <CustomRating
            rating={props.course?.rating}
            total_enrollment={props.course?.total_enrollment}
          />
        </div>
      </div>
      {props.absoluteCourseInfo}
      <div className="ml-[320px] flex w-[1000px] flex-col items-start gap-7 py-[70px]">
        <CourseUnderlineNavBar />
        {selection === 'overview' && <OverView course={props.course} />}
        <ListReviews course_id={props.course.id} isVisible={selection === 'review'} />

        <CourseDetailSectionTitle title={'Tác giả'} text={''} className="mt-8" />
        <div className="flex h-[220px] justify-start gap-6">
          <Link
            href={`/profile/${props.course?.owner.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="h-[220px] w-[220px]" src={props.course?.owner.avatar} alt="" />
          </Link>
          <div className="flex w-[576px] flex-col justify-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <p className="font-lexend-deca text-[22px] font-medium leading-[22px] text-black">
                {props.course?.owner.username}
              </p>
              <p className="font-lexend-deca font-light leading-[22px] text-[#5C5C5C]">
                Google UX Designer
              </p>
            </div>
            <div className="flex items-center gap-[10px]">
              <img src="/images/course/small-group.svg" alt="" />
              <p className="font-lexend-deca text-base font-light leading-[20px] text-[#5C5C5C]">
                232 Học viên
              </p>
              <CustomRating
                average={{
                  color: '5C5C5C',
                  value: 4.5,
                  review_count: props.course?.review_count,
                }}
              />
            </div>
            <div className="h-[1px] w-full bg-light-border" />
            <p className="py-2">
              Donald Logan has more than 15 years’ experience as a project management consultant,
              educator, technology consultant, business know.
            </p>
            <PrimaryOutlineButton className="w-[174px]" text="Xem thêm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailMain;
