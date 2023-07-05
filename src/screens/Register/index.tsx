import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Divider,
  em,
  Flex,
  Grid,
  MantineProvider,
  rem,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import * as Yup from 'yup';

import { CodeSmoothApi } from '@/api/codesmooth-api';
import { AuthWrapper } from '@/components/auth';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import RHFPasswordField from '@/components/hook-form/RHFPasswordField';
import { PATH_AUTH } from '@/routes/path';

type Props = {};
type FormValuesProps = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  afterSubmit?: string;
};
const Login = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState<string | null>(null);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
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

    try {
      await CodeSmoothApi.register(email, password, username);
      reset(defaultValues);
      router.push(PATH_AUTH.login);
    } catch (error: any) {
      setErrorRegister(error.response.data.message);
      console.log(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AuthWrapper>
        <Box
          sx={(theme) => ({
            borderRadius: 15,
            width: rem(400),
            height: rem(600),
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
              placeholder="Địa chỉ email"
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
            <RHFTextField
              name="username"
              placeholder="Tên đăng nhập"
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
            <RHFPasswordField
              name="passwordConfirm"
              placeholder="Nhập lại mật khẩu"
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
                    width: rem(326),
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
                  borderRadius: rem(8),
                }}
              >
                Đăng ký
              </Button>
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
                >
                  Đã có tài khoản?
                </span>
                <Link href={PATH_AUTH.login} className="no-underline">
                  Đăng nhập
                </Link>
              </Container>
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
