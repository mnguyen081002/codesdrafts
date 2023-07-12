import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { PrimaryButton } from '@/components/Button';
import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

const Payment = () => {
  const router = useRouter();
  const { query } = router;
  const { vnp_TransactionStatus } = query;
  return (
    <div>
      <HeaderPrimary />
      <div className="flex flex-col items-center justify-center">
        {vnp_TransactionStatus === '00' ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              className="mt-12 mb-10"
              src="/svg/GreenTick.svg"
              width={100}
              height={100}
              alt="success_tick"
            />
            <span className="font-inter text-3xl ">Thanh toán thành công !</span>
            <span className="mb-12 font-inter text-lg font-light">
              Hãy chuẩn bị sẵn sàng cho một hành trình học tập tuyệt vời và nắm bắt những kiến thức
              quý giá nhé
            </span>
            <PrimaryButton
              className="mb-40 py-5"
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
              className="mt-12 mb-10"
              src="/svg/lost.svg"
              width={100}
              height={100}
              alt="lost_tick"
            />
            <span className="font-inter text-3xl ">Thanh toán thất bại !</span>
            <span className="mb-12 font-inter text-lg font-light">
              Nếu bạn gặp bất kỳ vấn đề hoặc cần hỗ trợ, xin vui lòng liên hệ với chúng tôi qua số
              điện thoại XXX-XXX-XXXX hoặc gửi email đến customersupport@example.com
            </span>
            <PrimaryButton
              className="mb-40 py-5"
              text="Quay lại"
              endIcon={
                <Image src="/svg/ArrowForward.svg" width={20} height={20} alt="arrow_right" />
              }
              onClick={() => router.back()}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Payment;
