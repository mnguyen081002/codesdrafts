import { UnderlineNavbar } from '../NavBar/UnderlineNavbar';

function CourseLong({ isPublished = false }: { isPublished?: boolean }) {
  return (
    <div className="flex h-[210px] cursor-pointer items-center justify-between border-t border-light-border py-[15px] pl-[25px] pr-[98px]">
      <div className="flex h-full gap-[30px]">
        <img
          className="h-[180px] w-[270px] rounded-[5px]"
          src="/images/course/Thumnail.png"
          alt=""
        />
        <div className="flex h-full w-[390px] flex-col items-start justify-between py-[11px]">
          <div className="flex flex-col gap-[15px]">
            <p className="font-lexend-deca text-2xl font-semibold leading-6">
              Master Design System In Figma
            </p>
            <p className="flex gap-2 font-lexend-deca text-sm font-normal text-[#252525]">
              Thời Gian Cập Nhật:
              <span className="font-light tracking-wider text-[#535353]">
                18:16 14 tháng 5 năm 2023
              </span>
            </p>
          </div>
          {
            <div className="flex w-fit items-center gap-[10px] rounded bg-[#f5f5f5] py-[4px] px-[8px]">
              <img
                src={`/images/icons/${isPublished ? 'correct-green' : 'unpublish'}.svg`}
                alt=""
                className="object-contain"
              />
              <p className="font-lexend-deca text-xs font-normal capitalize leading-5 text-[#747474]">
                {isPublished ? 'Đã phát hành' : 'Đang chờ duyệt'}
              </p>
            </div>
          }
        </div>
      </div>
      <div className="flex items-center gap-[100px] text-[#3f3f3f]">
        <p className="font-lexend-deca text-lg font-normal leading-6">150.000 VNĐ</p>
        <p className="font-lexend-deca text-base font-light leading-6">3d20h11m</p>
        <p className="font-lexend-deca text-base font-light leading-6">Cơ Bản</p>
      </div>
    </div>
  );
}

const ListCoursePage = () => {
  return (
    <>
      <p className="w-full font-lexend-deca text-4xl font-semibold">Khóa học của tôi</p>
      <div className="flex w-full flex-col gap-[27px] pb-[60px]">
        <UnderlineNavbar
          textSelectedColor="text-light-text-primary"
          dividerSelectedColor="bg-light-text-primary"
          badge
          isInstructor={true}
          navs={[
            {
              title: 'Tất cả',
            },
            {
              title: 'Đang chờ duyệt',
            },
          ]}
        />
        <div className="flex flex-col rounded-[5px] border border-light-border">
          <div className="flex justify-between py-[15px] pl-[25px] pr-[110px] text-base font-medium uppercase leading-6 text-[#777]">
            <p>KHÓA HỌC</p>
            <div className="flex gap-[100px]">
              <p>Giá</p>
              <p>Thời gian</p>
              <p>Cấp độ</p>
            </div>
          </div>
          <div className="h-[580px] overflow-y-scroll">
            <CourseLong isPublished />
            <CourseLong />
            <CourseLong isPublished />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCoursePage;
