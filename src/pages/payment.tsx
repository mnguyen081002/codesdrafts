import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { CodeSmoothApi } from '@/api/codesmooth-api';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Button';
import { Avatar } from '@/components/sub/avatar';
import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

function PaymentMethod({
  title,
  image,
  isSelected,
}: {
  title: string;
  image: string;
  isSelected?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-light-border bg-[#FCFCFC] py-2 px-5">
      <div className="flex items-center gap-[10px]">
        <div className="relative h-[20px] w-[20px] rounded-full border border-[#4d4d4d]">
          {isSelected && (
            <div className="absolute top-[50%] left-[50%] h-[14px] w-[14px] translate-y-[-50%] translate-x-[-50%] transform rounded-full bg-[#4d4d4d]" />
          )}
        </div>
        <p className="font-inter text-base font-normal leading-4 text-light-text-primary">
          {title}
        </p>
      </div>
      <img src={image} alt="" />
    </div>
  );
}

const PayementMethod = [
  {
    title: 'Thanh toán bằng MoMo',
    image: '/images/icons/momo.png',
    payment_method: 'MOMO',
  },
  {
    title: 'Thanh toán bằng VNpay',
    image: '/images/icons/vnpay.png',
    payment_method: 'VN_PAY',
  },
];

function MainLeft() {
  const router = useRouter();

  const [selected, setSelected] = useState(0);
  const { query } = router;
  const { id, vnp_TransactionStatus, vnp_CardType } = query;

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handlePayment = async () => {
    try {
      const res = await CodeSmoothApi.payment({
        course_id: Number(id),
        payment_method: PayementMethod[selected]!.payment_method,
      });
      toast.success(res.data.message);
      window.location.href = res.data.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex w-[400px] flex-col justify-between">
      <div className="flex h-[220px] flex-col justify-between">
        <p className="font-lexend-deca text-3xl font-medium capitalize leading-6 text-black">
          Chi tiết thanh toán
        </p>
        <div className="flex w-full flex-col gap-[30px] font-lexend-deca text-lg font-light leading-6 text-black">
          <div className="flex flex-col gap-[15px] border-b border-light-border pb-[20px] ">
            <div className="flex justify-between ">
              <p className="opacity-70">Giá bán:</p>
              <p className="font-normal">1.000.000 VNĐ</p>
            </div>
            <div className="flex justify-between ">
              <p className="opacity-70">Khuyến mãi:</p>
              <p className="font-normal">0 VNĐ</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="opacity-70">Tổng tiền:</p>
            <p className="text-[22px] font-medium">150.000 VNĐ</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex flex-col gap-[1px]">
          {PayementMethod.map((item, index) => (
            <div key={index} onClick={() => handleSelect(index)}>
              <PaymentMethod
                title={item.title}
                image={item.image}
                isSelected={selected === index}
              />
            </div>
          ))}
        </div>
        <PrimaryButton className="py-5" text="Thanh toán" onClick={() => handlePayment()} />
      </div>
    </div>
  );
}

function MainRight() {
  return (
    <div className="flex flex-col gap-[15px] rounded-md bg-white p-4 shadow-md">
      <img src="/images/course/Thumnail.png" alt="" />
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-[12px]">
          <p className="font-lexend-deca text-2xl font-semibold leading-6 text-black">
            Master Design System In Figma
          </p>
          <div className="flex h-full gap-[9px]">
            <Avatar h={45} w={45} />
            <div className="flex h-[43px] flex-col justify-center">
              <p className="font-inter text-base font-medium leading-[14px] text-[#141414] opacity-[87%]">
                Minh Nguyên
              </p>
              <p className="font-inter text-[13px] font-normal leading-[20px] text-light-text-sencondary">
                Google Expert
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between">
            <p className="font-lexend-deca text-base font-medium text-light-text-sencondary">
              Giá bán:
            </p>
            <p className="font-lexend-deca text-[22px] font-medium leading-6 text-black">
              150.000 VNĐ
            </p>
          </div>
          <div className="flex flex-col justify-center gap-[6px] border-t border-light-border pt-[15px]">
            <p className="font-lexend-deca  text-[16px] font-medium text-light-text-sencondary">
              Mã khuyến mãi
            </p>
            <div className="flex w-fit items-center gap-[10px]">
              <input
                type="text"
                className="h-[45px] w-[200px]  rounded-md bg-white px-[20px] placeholder-[#4C4E64] placeholder-opacity-[60%]"
                placeholder="Nhập mã khuyến mãi"
              />
              <PrimaryOutlineButton
                textClassName="text-[12px] leading-[20px]"
                className="px-[10px] py-[6px]"
                text="Áp Dụng"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Checkout = () => {
  const router = useRouter();

  const [selected, setSelected] = useState(0);
  const { query } = router;
  const { id, vnp_TransactionStatus } = query;

  return (
    <>
      <HeaderPrimary />
      {!id ? (
        <div className="flex flex-col items-center justify-center">
          {vnp_TransactionStatus === '00' ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                className="mt-[120px] py-5"
                src="/svg/GreenTick.svg"
                width={100}
                height={100}
                alt="success_tick"
              />
              <span className="text-3xl font-semibold">Thanh toán thành công !</span>
              <span className="mb-[115px] font-inter text-lg font-light">
                Hãy chuẩn bị sẵn sàng cho một hành trình học tập tuyệt vời và nắm bắt những kiến
                thức quý giá nhé
              </span>
              <PrimaryButton
                isOrginalPadding={false}
                textClassName="text-sm leading-[20px]"
                className="mb-[351px] h-[44px] w-[295px] py-5"
                text="Đến trang khóa học của tôi"
                endIcon={
                  <Image src="/svg/ArrowForward.svg" width={20} height={20} alt="arrow_right" />
                }
                onClick={() => router.push('/course')}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                className="mt-[120px] mb-10"
                src="/svg/lost.svg"
                width={100}
                height={100}
                alt="lost_tick"
              />
              <span className="text-4xl font-semibold ">Thanh toán thất bại !</span>
              <span className="mb-[97px] w-[793px] text-center font-inter text-base font-light">
                Nếu bạn gặp bất kỳ vấn đề hoặc cần hỗ trợ, xin vui lòng liên hệ với chúng tôi qua số
                điện thoại XXX-XXX-XXXX hoặc gửi email đến{' '}
                <span className="underline">customersupport@example.com</span>
              </span>
              <PrimaryButton
                customHeightWidthTailWind="h-[46px] w-[143px]"
                textClassName="text-sm leading-[20px]"
                className="mb-[351px] h-[42px] w-[185px] py-5"
                text="Quay lại"
                isOrginalPadding={false}
                startIcon={
                  <Image src="/svg/ArrowBack.svg" width={20} height={20} alt="arrow_right" />
                }
                onClick={() => router.back()}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full justify-center py-[80px]">
          <div className="flex w-fit items-center gap-[40px] rounded-md px-[50px] py-[40px] shadow-md">
            <div className="flex h-[576px] gap-[50px]">
              <MainLeft></MainLeft>
              <MainRight></MainRight>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Checkout;
