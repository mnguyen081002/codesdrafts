import { Loader } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { PrimaryButton } from '../../components/Button';

type Props = {
  className?: string;
};

export const CommonLoading = (props: Props) => {
  return (
    <div className={props.className}>
      <Loader />
    </div>
  );
};

export function CheckoutComplete() {
  const router = useRouter();

  const { query } = router;
  const { vnp_TransactionStatus } = query;
  if (vnp_TransactionStatus === undefined)
    return <CommonLoading className="flex h-screen w-full items-center justify-center" />;
  return (
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
            Hãy chuẩn bị sẵn sàng cho một hành trình học tập tuyệt vời và nắm bắt những kiến thức
            quý giá nhé
          </span>
          <PrimaryButton
            isOrginalPadding={false}
            textClassName="text-sm leading-[20px]"
            className="mb-[351px] h-[44px] w-[295px] py-5"
            text="Đến trang khóa học của tôi"
            endIcon={<Image src="/svg/ArrowForward.svg" width={20} height={20} alt="arrow_right" />}
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
            <span className="underline">support@codedrafts.com</span>
          </span>
          <PrimaryButton
            customHeightWidthTailWind="h-[46px] w-[143px]"
            textClassName="text-sm leading-[20px]"
            className="mb-[351px] h-[42px] w-[185px] py-5"
            text="Quay lại"
            isOrginalPadding={false}
            startIcon={<Image src="/svg/ArrowBack.svg" width={20} height={20} alt="arrow_right" />}
            onClick={() => router.back()}
          />
        </div>
      )}
    </div>
  );
}
