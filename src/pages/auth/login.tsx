import Head from 'next/head';

import AuthLoginForm from '@/components/auth/AuthLoginForm';
import LoginLayout from '@/components/auth/LoginLayout';

export default function AuthLogin() {
  return (
    <>
      <Head>
        <title>Đăng nhập | Codesmooth cms</title>
      </Head>
      <LoginLayout>
        <AuthLoginForm />
      </LoginLayout>
    </>
  );
}
