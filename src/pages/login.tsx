import { Box, Button, Divider, Flex, Grid, PasswordInput, rem, TextInput } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { AuthWrapper } from '@/components/auth';

type Props = {};

const Login = (props: Props) => {
  return (
    <AuthWrapper>
      <Box
        sx={(theme) => ({
          borderRadius: 15,
          width: rem(368),
          backgroundColor: theme.white,
          position: 'relative',
          zIndex: 10,
          padding: '4.01%',
          paddingTop: rem(52),
          paddingBottom: rem(100),
        })}
      >
        <Flex justify="center" mb={95}>
          <Link href="/">
            <Image src="/logo-96.png" width={70} height={70} alt="" />
          </Link>
        </Flex>
        <Flex direction="column" gap={30}>
          <TextInput placeholder="Tên đăng nhập" />
          <PasswordInput
            placeholder="Mật khẩu"
            sx={{
              '& input:focus': {
                border: '0 !important',
              },
            }}
          />
          <Button
            sx={{
              boxShadow: '0px 12px 21px 4px rgba(68, 97, 242, 0.15)',
            }}
          >
            Đăng nhập
          </Button>
        </Flex>
        <Divider
          label="Hoặc tiếp tục với"
          labelPosition="center"
          my={24}
          sx={(theme) => ({
            color: theme.colors.gray[5],
          })}
        />
        <Grid>
          <Grid.Col span={4}>
            <Button variant="outline" color="gray" w="100%">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button variant="outline" w="100%" color="gray">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button variant="outline" w="100%" color="gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 14222 14222"
              >
                <circle cx="7111" cy="7112" r="7111" fill="#1977f3" />
                <path
                  d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                  fill="#fff"
                />
              </svg>
            </Button>
          </Grid.Col>
        </Grid>
      </Box>
    </AuthWrapper>
  );
};

export default Login;
