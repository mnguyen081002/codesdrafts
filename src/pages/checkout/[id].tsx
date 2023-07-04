import { PrimaryButton, PrimaryOutlineButton } from '../../components/Button';
import HeaderPrimary from '../../components/home/HeaderPrimary';
import { Avatar } from '../../components/sub/avatar';
import Footer from '../../layouts/Footer';

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

function MainLeft() {
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
          <PaymentMethod image="/images/icons/momo.png" isSelected title="Thanh toán bằng MoMo" />
          <PaymentMethod image="/images/icons/vnpay.png" title="Thanh toán bằng VNpay" />
        </div>
        <PrimaryButton className="py-5" text="Thanh toán" />
      </div>
    </div>
  );
}

function MainRight() {
  return (
    <div className="flex flex-col gap-[15px] rounded-md bg-white p-4 shadow-md">
      <img src="/images/course/Thumnail.png" alt="" />
      <div className="flex flex-col gap-[30px] py-2">
        <div className="flex flex-col gap-[50px]">
          <div>
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
    </div>
  );
}

const Checkout = () => {
  return (
    <>
      <HeaderPrimary />
      <div className="flex h-fit w-full items-center px-[400px] py-[60px]">
        <div className="flex h-full w-fit gap-[40px] rounded-md border-2 border-light-border px-[50px] py-[40px]">
          <div className="flex h-[576px] gap-[50px]">
            <MainLeft></MainLeft>
            <MainRight></MainRight>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
