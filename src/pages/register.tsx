import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Flex, MantineProvider, rem } from '@mantine/core';
import type { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { CodedraftsApi } from '@/api/codedrafts-api';
import { AuthWrapper } from '@/components/auth';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFPasswordField from '@/components/hook-form/RHFPasswordField';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes/path';

import { PrimaryButton } from '../components/Button';
import Header from '../layouts/Header';
import { Social } from './login';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_DASHBOARD.home,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}

type Props = {};
type FormValuesProps = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  afterSubmit?: string;
};
const Register = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState<string | null>(null);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    username: Yup.string().required('Tên người dùng là bắt buộc'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const { email, password, username } = data;
    setLoading(true);
    const result: any = await CodedraftsApi.register(email, username, password)
      .then((res) => {
        reset(defaultValues);
        toast.success('Đăng ký thành công');
        router.push(PATH_DASHBOARD.main);
      })
      .catch((err) => {
        setErrorRegister(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <AuthWrapper>
        <Box
          className="shadow-md"
          sx={(theme) => ({
            borderRadius: 15,
            width: rem(467),
            backgroundColor: theme.white,
            position: 'relative',
            zIndex: 10,
            padding: `${rem(30)} ${rem(40)}`,
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div>
            <div>
              <Flex justify="center" mb={45}>
                <Link href="/">
                  <Image src="/logo-96.png" width={80} height={80} alt="" />
                </Link>
              </Flex>
              <Flex direction="column" gap={16}>
                <RHFTextField
                  name="email"
                  placeholder="Địa chỉ email"
                  sx={{
                    '& input': {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                  }}
                />
                <RHFTextField
                  name="username"
                  placeholder="Tên người dùng"
                  sx={{
                    '& input': {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                  }}
                />
                <RHFPasswordField
                  name="password"
                  placeholder="Mật khẩu"
                  styles={{
                    wrapper: {
                      '& input:focus': {
                        border: '0 !important',
                      },
                    },
                    input: {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                    innerInput: {
                      height: 'auto',
                    },
                  }}
                />
                <RHFPasswordField
                  name="passwordConfirm"
                  placeholder="Nhập lại mật khẩu"
                  styles={{
                    wrapper: {
                      '& input:focus': {
                        border: '0 !important',
                      },
                    },
                    input: {
                      height: rem(55),
                      borderRadius: rem(8),
                    },
                    innerInput: {
                      height: 'auto',
                    },
                  }}
                />
                <MantineProvider
                  theme={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {errorRegister && (
                    <Container
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        position: 'absolute',
                        gap: rem(8),
                        color: '#FF3D71',
                        height: rem(32),
                        width: rem(366),
                        padding: rem(8),
                        borderRadius: rem(4),
                        fontSize: rem(12),
                        bottom: rem(230),
                      }}
                    >
                      <BiError size={20} />
                      <span>{errorRegister}</span>
                    </Container>
                  )}
                  <PrimaryButton className="mt-3 h-[55px]" type="submit" text="Đăng ký" />
                  <Container
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      gap: rem(8),
                      height: rem(32),
                      width: rem(366),
                      padding: rem(8),
                      borderRadius: rem(4),
                      fontSize: rem(14),
                    }}
                  >
                    <span
                      style={{
                        color: '#696767',
                      }}
                    >
                      Đã có tài khoản?
                    </span>
                    <Link href={PATH_AUTH.login} className="no-underline">
                      Đăng nhập
                    </Link>
                  </Container>
                </MantineProvider>
              </Flex>
            </div>
            <Social />
          </div>
        </Box>
      </AuthWrapper>
    </FormProvider>
  );
};

export default Register;
