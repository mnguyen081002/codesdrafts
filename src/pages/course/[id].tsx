import { PrimaryButton, PrimaryOutlineButton } from '../../components/Button';
import HeaderPrimary from '../../components/home/HeaderPrimary';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import {
  CourseDetailSection,
  CourseDetailSectionTitle,
} from '../../components/Student/CourseDetail/CourseDetailSection';
import CourseInfoInclude from '../../components/Student/CourseDetail/CourseInfoInclude';
import CourseSubInfo from '../../components/Student/CourseDetail/CourseSubInfo';
import { Avatar } from '../../components/sub/avatar';
import CourseDetailTableOfContent from '../../components/sub/CourseDetailTableOfContent';
import CustomRating from '../../components/sub/CustomRating';
import Footer from '../../layouts/Footer';

const CourseDetail = () => {
  return (
    <>
      <HeaderPrimary />
      <div className="h-fit w-full">
        <div className="relative flex w-full flex-col justify-start gap-[20px] bg-[#041734] py-[100px] pl-[320px] pr-[220px]">
          <p className="w-fit rounded-3xl bg-[#1CCC19] py-1 px-3 font-lexend-deca font-semibold text-white">
            Graphic Design
          </p>
          <p className="font-lexend-deca text-[46px] font-semibold capitalize text-white">
            Master design system in figma
          </p>
          <p className="font-lexend-deca text-lg font-normal text-[#B2BDCD]">
            Design tutorial will help you learn quickly and thoroughly orem ipsumor lipsum as it is
            sometime
          </p>
          <div className="flex items-center gap-[25px]">
            <div className="flex items-center gap-[9px]">
              <Avatar w={60} h={60} />
              <div className="flex h-[43px] w-[260px] flex-col justify-start gap-[9px]">
                <p className="font-inter text-2xl font-semibold leading-5 text-white opacity-[87%]">
                  Minh Nguyên
                </p>
                <p className="font-inter text-lg font-normal leading-5 tracking-[0.15px] text-white opacity-[68%]">
                  Google Expert
                </p>
              </div>
            </div>
            <CourseSubInfo icon="/images/course/File.svg" text="19" />
            <CourseSubInfo icon="/images/course/Clock.svg" text="20h18m" />
            <CourseSubInfo icon="/images/course/People.svg" text="232" />
            <CustomRating />
          </div>
        </div>
        <div className="absolute top-[142px] right-[128px] flex flex-col rounded-md bg-white px-4 pt-4 pb-10 shadow-md">
          <img src="/images/course/Thumnail.png" alt="thumbnail" className="mb-10" />
          <div className="flex flex-col gap-10 px-5">
            <div className="flex items-center justify-center gap-4">
              <p className="font-lexend-deca text-lg font-bold text-light-text-course-detail-content">
                Giá:
              </p>
              <p className="font-lexend-deca text-2xl font-bold leading-5 tracking-[0.15px]">
                150.000 VNĐ
              </p>
              <p className="font-lexend-deca text-lg font-bold text-light-text-course-detail-content line-through">
                320.000
              </p>
            </div>
            <PrimaryButton text="ĐĂNG KÝ KHÓA HỌC" />
            <div className="flex w-full flex-col justify-start gap-[15px]">
              <p className="font-lexend-deca font-semibold uppercase leading-5 text-[#082A5E]">
                Khóa học này bao gồm
              </p>
              <CourseInfoInclude
                title="Thời gian"
                icon="/images/course/ClockBlue.svg"
                text="20h 18m"
              />
              <CourseInfoInclude
                title="Danh mục"
                icon="/images/course/FileBlue.svg"
                text="Graphic Design, UI/UX"
              />
              <CourseInfoInclude
                title="Học viên"
                icon="/images/course/small-group.svg"
                text="232"
              />
              <CourseInfoInclude
                title="Cấp độ"
                icon="/images/course/small-level.svg"
                text="Cơ bản"
              />
              <CourseInfoInclude title="Chia sẻ" icon="/images/course/small-share.svg" />
            </div>
          </div>
        </div>
        <div className="ml-[320px] flex w-[1000px] flex-col items-start gap-7 py-[70px]">
          <UnderlineNavbar
            navs={[
              {
                title: 'Thông tin khóa học',
              },
              {
                title: 'Đánh giá',
                className: 'px-[10px]',
              },
            ]}
          />
          <p className="font-lexend-deca text-base font-light leading-8 text-light-text-course-detail-content">
            Khóa học này sẽ giúp bạn học nhanh và thông suốt will help you learn quickly and
            thoroughly. Lorem ipsum, or lipsum as it is sometimes known, iaws dumm text used in
            laying out print, graphic or web designs. Lorem ipsum dolor sit amet, consectetuer
            adipiscingawr elit onec odio. Quisque volutpat mattis eros. <br></br> You’ll be exposed
            to principles and strategies, but, more importantly, you’ll learn how to actually apply
            these abstract concepts by coding three different websites for three very different
            audiences. Lorem ipsum is dummy text used in laying out print, graphic or web designs
            Lorem ipsum
          </p>
          <CourseDetailSection
            contents={[
              'Trở thành UX/UI Designer chuyên nghiệp chuyên nghiệp chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp chuyên nghiệp chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp chuyên nghiệp chuyên nghiệp chuyên nghiệp chuyên nghiệp chuyên nghiệp chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp',
              'Trở thành UX/UI Designer chuyên nghiệp',
              'Biết cách sử dụng Figma',
              'Xây dựng hệ thống thiết kế',
            ]}
            title="Bạn sẽ học được gì?"
            text="This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it is
        sometimes known, iaws dumm text used in laying out print, graphic or web designsm dolor sit
        amet."
          />
          <CourseDetailSection
            contents={['Biết cách sử dụng Figma', 'Xây dựng hệ thống thiết kế']}
            title="Yêu cầu"
            text="Cần một số yêu cầu cần thiết để bạn có thể hoàn thành khóa học này."
          />
          <CourseDetailSectionTitle title={'Nội dung giảng dạy'} text={''} noUnderline />
          <CourseDetailTableOfContent
            data={[
              {
                title: '1. Giới thiệu khóa học',
                contents: [
                  'Figma là gì?',
                  'Các thành phần trong Figma',
                  'Giao diện Figma',
                  'Những lưu ý khi sử dụng Figma',
                  'Hướng dẫn cài đặt Figma',
                  'Thiết lập tài khoản Figma',
                  'Quy trình làm việc với Figma',
                  'Case study',
                  'Kết luận',
                ],
              },
              {
                title: '1. Giới thiệu khóa học',
                contents: [
                  'Figma là gì?',
                  'Các thành phần trong Figma',
                  'Giao diện Figma',
                  'Những lưu ý khi sử dụng Figma',
                  'Hướng dẫn cài đặt Figma',
                  'Thiết lập tài khoản Figma',
                  'Quy trình làm việc với Figma',
                  'Case study',
                  'Kết luận',
                ],
              },
            ]}
          />
          <CourseDetailSectionTitle title={'Tác giả'} text={''} className="mt-8" />
          <div className="flex h-[220px] justify-start gap-6">
            <img className="h-[220px] w-[220px]" src="/images/icons/AvatarLarge.png" alt="" />
            <div className="flex w-[576px] flex-col justify-start gap-2">
              <div className="flex flex-col items-start gap-1">
                <p className="font-lexend-deca text-[22px] font-medium leading-[22px] text-black">
                  Minh Nguyên
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
                  }}
                />
              </div>
              <div className="h-[1px] w-full bg-light-border" />
              <p className="py-2">
                Donald Logan has more than 15 years’ experience as a project management consultant,
                educator, technology consultant, business know.
              </p>
              <PrimaryOutlineButton text="Xem thêm" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
