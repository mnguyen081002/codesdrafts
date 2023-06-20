import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, em, Flex, Grid, MantineProvider, rem } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { AuthWrapper } from '@/components/auth';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFPasswordField from '@/components/hook-form/RHFPasswordField';
import { PATH_DASHBOARD } from '@/routes/path';

type Props = {};
type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};
const Login = (props: Props) => {
  const [loading, setLoading] = useState(false);
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
  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const { email, password } = data;
    setLoading(true);
    const result: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: PATH_DASHBOARD.main,
    });
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      reset(defaultValues);
      toast.success('Đăng nhập thành công');
      router.push(PATH_DASHBOARD.main);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AuthWrapper>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            width: rem(400),
            height: rem(528),
            backgroundColor: theme.white,
            position: 'relative',
            zIndex: 10,
            padding: '4.01%',
            paddingTop: rem(52),
            paddingBottom: rem(100),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 3px 4px 0px rgb(198,198,198)',
          })}
        >
          <Flex justify="center" mb={45}>
            <Link href="/">
              <Image src="/logo-96.png" width={60} height={60} alt="" />
            </Link>
          </Flex>
          <Flex direction="column" gap={16} mb={rem(80)}>
            <RHFTextField
              name="email"
              placeholder="Email"
              sx={{
                '& wrapper': {
                  width: rem(326),
                },
                '& input': {
                  height: rem(42),
                  borderRadius: rem(8),
                },
              }}
            />
            <RHFPasswordField
              name="password"
              placeholder="Mật khẩu"
              styles={{
                wrapper: {
                  width: rem(326),
                  '& input:focus': {
                    border: '0 !important',
                  },
                },
                input: {
                  height: rem(42),
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
              <Button
                loading={loading}
                type="submit"
                className="bg-light-primary text-white hover:bg-light-primary"
                sx={{
                  marginTop: rem(30),
                  boxShadow: '0px 12px 21px 4px #4461F226',
                  width: rem(326),
                  height: rem(42),
                  fontSize: rem(16),
                  fontWeight: 600,
                  lineHeight: rem(30),
                  letterSpacing: em(0.1),
                }}
              >
                Đăng nhập
              </Button>
            </MantineProvider>
          </Flex>
          <Divider
            label="Hoặc tiếp tục với"
            labelPosition="center"
            sx={(theme) => ({
              color: theme.colors.gray[5],
              position: 'absolute',
              bottom: rem(110),
            })}
            w={rem(306)}
          />
          <Grid
            sx={{
              position: 'absolute',
              bottom: rem(32),
            }}
          >
            <Grid.Col span={4}>
              <Image
                className="cursor-pointer"
                src="/images/icons/Google.svg"
                width={80}
                height={46}
                alt=""
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Image
                className="cursor-pointer"
                src="/images/icons/Github.svg"
                width={80}
                height={46}
                alt=""
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Image
                className="cursor-pointer"
                src="/images/icons/Facebook.svg"
                width={80}
                height={46}
                alt=""
              />
            </Grid.Col>
          </Grid>
        </Box>
      </AuthWrapper>
    </FormProvider>
  );
};

export default Login;
