import { useState } from 'react';

import { InputAutoComplete, InputRectangle, InputRounded } from '../../common/Input';
import { PrimaryButton, PrimaryOutlineButton } from '../../components/Button';
import Footer from '../../layouts/Footer';
import { HeaderInstructor } from '../../layouts/Instructor/Instructor';
import SideBarInstructor from '../../layouts/Instructor/Sidebar';

const CreateCouse: React.FC = () => {
  const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();

  return (
    <>
      <HeaderInstructor
        rightContent={
          <div className="flex gap-6">
            <PrimaryOutlineButton className="w-fit" text="Xem trước" />
            <PrimaryButton className="w-fit" text="Lưu" />
          </div>
        }
      />
      <div className="flex w-full">
        <SideBarInstructor />
        <div className="flex flex-1 flex-col gap-[15px] px-[300px] py-[60px] font-lexend-deca leading-6 text-light-text-primary">
          {!thumbnailUpload ? (
            <div className="flex h-[200px] w-[300px] flex-col items-center justify-center gap-[10px] rounded-[5px] border-2 border-dashed border-[#8F9397] py-[20px] px-[37px]">
              <img className="h-[55px] w-[55px]" src="/images/icons/wallpaper.svg" alt="" />
              <p className="font-lexend-deca text-sm font-normal leading-6 text-light-text-main">
                1122 x 748
              </p>
              <p className="font-lexend-deca text-lg leading-6 text-light-text-main">
                Tải ảnh lên
                <span className="text-black"> hoặc kéo thả</span>
              </p>
              <p className="font-lexend-deca text-sm font-light text-[#8A8A8A]">
                PNG, JPG, GIF lên đến 2MB
              </p>
              <input
                type="file"
                className="absolute z-10 h-[200px] w-[300px] cursor-pointer opacity-0"
                onChange={(event) => {
                  if (event.target.files) {
                    setThumbnailUpload(event.target.files[0]);
                  }
                }}
              />
            </div>
          ) : (
            <img
              className="h-[200px] w-[300px]"
              src={URL.createObjectURL(thumbnailUpload)}
              alt=""
            />
          )}

          <InputRounded
            label="Tiêu đề khóa học *"
            maxLength={40}
            placeholder="Nhập tiêu đề khóa học"
            type="text"
            rightLabel="Tối đa 40 ký tự"
          />
          <InputRectangle
            label="Mô tả *"
            maxLength={500}
            placeholder="Nhập mô tả khóa học"
            type="text"
            className="pb-32"
          />
          <InputRectangle
            label="Mô tả ngắn *"
            maxLength={200}
            placeholder="Nhập mô tả ngắn khóa học"
            type="text"
            className="pb-32"
          />
          <div className="flex justify-center">
            <PrimaryOutlineButton className="w-fit" text="CHỈNH SỬA BÀI HỌC" />
          </div>
          <InputAutoComplete
            options={['React', 'NodeJS', 'TypeScript']}
            label={'Các kĩ năng *'}
            placeholder="Những kĩ năng nào sẽ được nói tới trong khóa học ? (Ấn Enter để thêm)"
            type="text"
            isMulti
          />
          <InputAutoComplete
            options={['React', 'NodeJS', 'TypeScript']}
            label={'Mục tiêu khóa học *'}
            placeholder="Người học sẽ học được gì khi hoàn thành khóa học ? (Ấn Enter để thêm)"
            type="text"
            isMulti
          />
          <InputAutoComplete
            options={['React', 'NodeJS', 'TypeScript']}
            label={'Yêu cầu khóa học *'}
            placeholder="Người học cần có những gì để có thể học khóa học này ? (Ấn Enter để thêm)"
            type="text"
            isMulti
          />
          <InputAutoComplete
            options={['Sinh viên', 'Lập trình viên', 'Người mới bắt đầu']}
            label={'Đối tượng khóa học *'}
            placeholder="Khóa học này dành cho những đối tượng nào ? (Ấn Enter để thêm)"
            type="text"
          />
          <InputRectangle label="Feedback Email" placeholder="Nhập email" type="text" />

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
      </div>
      <Footer />
    </>
  );
};

export default CreateCouse;
