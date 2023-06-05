import {
  Box,
  Button,
  Divider,
  em,
  Flex,
  Grid,
  MantineProvider,
  PasswordInput,
  rem,
  TextInput,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { AuthWrapper } from '@/components/auth';

type Props = {};

const Login = (props: Props) => {
  return (
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
          <TextInput
            placeholder="Tên đăng nhập"
            styles={{
              wrapper: {
                width: rem(326),
              },
              input: {
                height: rem(42),
                borderRadius: rem(8),
              },
            }}
          />
          <PasswordInput
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
  );
};

export default Login;
