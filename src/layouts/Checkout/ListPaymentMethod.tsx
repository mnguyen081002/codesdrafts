import { useState } from 'react';

interface PaymentMethodItemProps {
  title: string;
  image: string;
  isSelected?: boolean;
}

function PaymentMethodItem(props: PaymentMethodItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-light-border bg-[#FCFCFC] py-2 px-5">
      <div className="flex items-center gap-[10px]">
        <div className="relative h-[20px] w-[20px] rounded-full border border-[#4d4d4d]">
          {props.isSelected && (
            <div className="absolute top-[50%] left-[50%] h-[14px] w-[14px] translate-y-[-50%] translate-x-[-50%] transform rounded-full bg-[#4d4d4d]" />
          )}
        </div>
        <p className="font-inter text-base font-normal leading-4 text-light-text-primary">
          {props.title}
        </p>
      </div>
      <img src={props.image} alt="" />
    </div>
  );
}

interface ListPaymentMethodProps {
  onSelected: (paymentMethod: string) => void;
}

export function ListPaymentMethod(props: ListPaymentMethodProps) {
  const [selected, setSelected] = useState<string>('VIETQR');

  const PaymentMethod = [
    // {
    //   title: 'Thanh toán bằng MoMo',
    //   image: '/images/icons/momo.png',
    //   payment_method: 'MOMO',
    // },
    // {
    //   title: 'Thanh toán bằng VNpay',
    //   image: '/images/icons/vnpay.png',
    //   payment_method: 'VN_PAY',
    // },
    {
      title: 'Thanh toán bằng VietQR',
      image: '/images/icons/viet-qr.svg',
      payment_method: 'VIETQR',
    },
  ];
  return (
    <div className="flex flex-col gap-[1px]">
      {PaymentMethod.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setSelected(item.payment_method);
            props.onSelected(item.payment_method);
          }}
        >
          <PaymentMethodItem
            title={item.title}
            image={item.image}
            isSelected={selected === item.payment_method}
          />
        </div>
      ))}
    </div>
  );
}
