import { yupResolver } from '@hookform/resolvers/yup';
import { MantineProvider } from '@mantine/core';
import type { NextPageContext } from 'next';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { PrimaryButton } from '@/components/Button';
import Facebook from '@/components/Facebook/Facebook';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFArea from '@/components/hook-form/RHFArea';
import Header from '@/layouts/Header';
import HeaderPrimary from '@/layouts/HeaderPrimary';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}

const dataContact = [
  {
    icon: '/svg/contact/location.svg',
    title: 'Địa chỉ',
    content: 'Thung lũng Đông Bắc',
  },
  {
    icon: '/svg/contact/phone.svg',
    title: 'Số điện thoại',
    content: '+1 (888) 123-4567',
  },
  {
    icon: '/svg/contact/email.svg',
    title: 'Email',
    content: 'info@example.com',
  },
];

type FormValuesProps = {
  name: string;
  email: string;
  phone: string;
  title: string;
  content: string;
};

const Contact = ({ session }) => {
  const ContactSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    name: Yup.string().required('Tên là bắt buộc'),
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    content: Yup.string().required('Nội dung là bắt buộc'),
  });

  const defaultValues = {
    email: '',
    name: '',
    phone: '',
    title: '',
    content: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {};

  return (
    <div className="h-full w-full">
      {session ? <HeaderPrimary /> : <Header />}
      <div className="flex h-[100vh] w-full items-center justify-center">
        <div className="mx-[260px] mb-[150px] flex w-[1400px] gap-[117px]">
          <div className="flex w-[692px] flex-col">
            <span className="text-xl font-semibold text-[#377DFF]">Chi tiết liên hệ</span>
            <span className="mb-[20px] mt-[10px] text-[25px] font-semibold text-[#000248]">
              Liên hệ
            </span>
            <div className="mb-[30px] flex">
              <span className="w-[544px] text-lg font-normal text-[#757589]">
                Nếu bạn có bất kỳ câu hỏi, ý kiến hoặc đề xuất nào, xin vui lòng điền vào biểu mẫu
                dưới đây. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </span>
            </div>
            <div className="flex flex-col gap-[34px]">
              {dataContact.map((item, index) => (
                <div key={index} className="flex items-center gap-[20px]">
                  <Image src={item.icon} width={51} height={51} alt="icon" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-[#757589]">{item.title}</span>
                    <span className="text-base font-normal text-[#000248]">{item.content}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MantineProvider
            theme={{
              components: {
                InputWrapper: {
                  defaultProps: {
                    inputWrapperOrder: ['label', 'error', 'input', 'description'],
                  },
                },

                Input: {
                  defaultProps: {
                    variant: 'filled',
                  },
                  styles: () => ({
                    input: {
                      '::placeholder': { color: '#757575', fontSize: '15px' },
                    },
                  }),
                },
              },
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex w-full flex-col gap-[20px]">
                <Image
                  src="/svg/contact/3line.svg"
                  className="absolute -top-12 -right-16"
                  width={67}
                  height={74}
                  alt="icon"
                />
                <RHFTextField
                  name="name"
                  placeholder="Tên*"
                  sx={{
                    '& .mantine-Input-input': {
                      height: '60px',
                    },
                  }}
                />
                <RHFTextField
                  name="email"
                  placeholder="Email*"
                  sx={{
                    '& .mantine-Input-input': {
                      height: '60px',
                    },
                  }}
                />
                <RHFTextField
                  name="phone"
                  placeholder="Số điện thoại"
                  sx={{
                    '& .mantine-Input-input': {
                      height: '60px',
                    },
                  }}
                />
                <RHFTextField
                  name="title"
                  placeholder="Tiêu đề*"
                  sx={{
                    '& .mantine-Input-input': {
                      height: '60px',
                    },
                  }}
                />
                <RHFArea
                  name="content"
                  className="h-[180px] w-[570px]"
                  sx={{
                    '& .mantine-Input-input': {
                      height: '180px',
                    },
                  }}
                />
                <Image
                  src="/svg/contact/4star.svg"
                  className="absolute bottom-16 -right-60"
                  width={67}
                  height={74}
                  alt="icon"
                />
                <PrimaryButton
                  text="Gửi ngay"
                  endIcon={<Image src="/svg/contact/send.svg" width={12} height={12} alt="icon" />}
                  className="h-[60px] text-base font-bold"
                  type="submit"
                />
              </div>
            </FormProvider>
            <Facebook />
          </MantineProvider>
        </div>
      </div>
    </div>
  );
};
export default Contact;
