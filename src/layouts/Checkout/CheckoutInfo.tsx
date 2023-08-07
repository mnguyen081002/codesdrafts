import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { CalculatePaymentResponse } from '../../api/codedrafts-api';
import { CodedraftsApi } from '../../api/codedrafts-api';
import type { GetCourseByIDResponse } from '../../api/student/course';
import { PrimaryButton, PrimaryOutlineButton } from '../../components/Button';
import { Avatar } from '../../components/sub/avatar';
import { TOAST_CONFIG } from '../../shared/constants/app';
import { formatCoursePrice, toastGetErrorMessage } from '../../utils/app';
import { ListPaymentMethod } from './ListPaymentMethod';

export function CheckoutInfo() {
  const router = useRouter();

  const [selected, setSelected] = useState<string>('MOMO');
  const [course, setCourse] = useState<GetCourseByIDResponse>();
  const { query } = router;
  const { id } = query;

  const [paymentInfo, setPaymentInfo] = useState<CalculatePaymentResponse>({
    discount: 0,
    price: 0,
    total: 0,
  });

  const handlePayment = async () => {
    try {
      const res = await CodedraftsApi.payment({
        course_id: Number(id),
        payment_method: selected,
      });
      window.location.href = res.data.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!router.query.id) return;
    const fetch = async () => {
      try {
        const r = await CodedraftsApi.calculatePayment({ course_id: Number(id) });
        const c = await CodedraftsApi.getCourseById(Number(id));
        setPaymentInfo(r.data.data);
        setCourse(c.data.data);
      } catch (error: any) {
        toast.error(toastGetErrorMessage(error), TOAST_CONFIG);
      }
    };
    fetch();
  }, [router.query.id]);
  return (
    <div className="flex w-full justify-center py-[80px]">
      <div className="flex w-fit items-center gap-[40px] rounded-md px-[50px] py-[40px] shadow-md">
        <div className="flex h-[576px] gap-[50px]">
          <div className="flex w-[400px] flex-col justify-between">
            <div className="flex h-[220px] flex-col justify-between">
              <p className="font-lexend-deca text-3xl font-medium capitalize leading-6 text-black">
                Chi tiết thanh toán
              </p>
              <div className="flex w-full flex-col gap-[30px] font-lexend-deca text-lg font-light leading-6 text-black">
                <div className="flex flex-col gap-[15px] border-b border-light-border pb-[20px] ">
                  <div className="flex justify-between ">
                    <p className="opacity-70">Giá bán:</p>
                    <p className="font-normal">{formatCoursePrice(paymentInfo.price, '')}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className="opacity-70">Khuyến mãi:</p>
                    <p className="font-normal">{formatCoursePrice(paymentInfo.discount, '')}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="opacity-70">Tổng tiền:</p>
                  <p className="text-[22px] font-medium">{formatCoursePrice(paymentInfo.total)}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-[30px]">
              <ListPaymentMethod onSelected={setSelected} />
              <PrimaryButton className="py-5" text="Thanh toán" onClick={() => handlePayment()} />
            </div>
          </div>
          <div className="flex w-[400px] flex-col gap-[15px] rounded-md bg-white p-4 shadow-md">
            <img className="h-[246px] w-[369px]" src="/images/course/Thumnail.png" alt="" />
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-[12px]">
                <p className="font-lexend-deca text-2xl font-semibold leading-6 text-black">
                  {course?.name}
                </p>
                <div className="flex h-full gap-[9px]">
                  <Avatar h={45} w={45} url={course?.owner.avatar} />
                  <div className="flex flex-col justify-center">
                    <p className="font-inter text-base font-medium leading-[14px] text-[#141414] opacity-[87%]">
                      {course?.owner.username}
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
                    {formatCoursePrice(paymentInfo.price)}
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
        </div>
      </div>
    </div>
  );
}
