// import { Login } from '@/screens';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Divider, Flex, MantineProvider, rem } from '@mantine/core';
import type { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import * as Yup from 'yup';

import { AuthWrapper } from '@/components/auth';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFPasswordField from '@/components/hook-form/RHFPasswordField';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes/path';

import { PrimaryButton } from '../components/Button';
import Header from '../layouts/Header';

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export function Social() {
  return (
    <div className="flex w-full flex-col">
      <Divider
        className="w-full"
        label="Hoặc tiếp tục với"
        labelPosition="center"
        labelProps={{
          sx: {
            color: '#696767',
            fontSize: rem(16),
          },
        }}
        sx={(theme) => ({
          color: theme.colors.gray[5],
          bottom: rem(110),
        })}
      />
      <div className="mt-3 flex w-full justify-between">
        <div className="flex h-[55px] w-[100px] items-center  justify-center rounded-[5px] border border-light-border">
          <img className="cursor-pointer" src="/images/icons/Google.svg" alt="" />
        </div>
        <div className="flex h-[55px] w-[100px] cursor-pointer items-center justify-center rounded-[5px] border border-light-border">
          <img src="/images/icons/Github.svg" alt="" />
        </div>
        <div className="flex h-[55px] w-[100px] cursor-pointer items-center justify-center rounded-[5px] border border-light-border">
          <img src="/images/icons/Facebook.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const { email, password } = data;
    setLoading(true);
    const result: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: PATH_DASHBOARD.home,
    });
    if (result?.error) {
      setErrorLogin(result.error);
      setLoading(false);
    } else {
      reset(defaultValues);
      router.push(PATH_DASHBOARD.home);
    }
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
            height: rem(682),
            backgroundColor: theme.white,
            position: 'relative',
            zIndex: 10,
            padding: `${rem(30)} ${rem(40)}`,
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="w-full">
              <Flex justify="center" mb={45}>
                <Link href="/">
                  <Image src="/logo-96.png" width={80} height={80} alt="" />
                </Link>
              </Flex>
              <Flex direction="column" gap={16} mb={rem(80)}>
                <RHFTextField
                  name="email"
                  placeholder="Email"
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
                <MantineProvider
                  theme={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {errorLogin && (
                    <Container
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: rem(285),
                        gap: rem(8),
                        color: '#FF3D71',
                        width: rem(326),
                        padding: rem(8),
                        borderRadius: rem(4),
                        fontSize: rem(12),
                      }}
                    >
                      <BiError size={20} />
                      <span>{errorLogin}</span>
                    </Container>
                  )}
                  <PrimaryButton type="submit" className="mt-3 h-[55px]" text="Đăng nhập" />
                  <Container
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      gap: rem(8),
                      height: rem(32),
                      width: rem(326),
                      padding: rem(8),
                      borderRadius: rem(4),
                      fontSize: rem(14),
                    }}
                  >
                    <span
                      style={{
                        color: '#696767',
                      }}
                      className="text-[16px]"
                    >
                      Chưa có tài khoản?
                    </span>
                    <Link href={PATH_AUTH.register} className="text-[16px] no-underline">
                      Đăng ký
                    </Link>
                  </Container>
                </MantineProvider>
              </Flex>
            </div>
            <Social></Social>
          </div>
        </Box>
      </AuthWrapper>
    </FormProvider>
  );
};

export default Login;

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
