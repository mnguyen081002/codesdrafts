import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { CodedraftsApi } from '../api/codedrafts-api';
import { PrimaryButton } from '../components/Button';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (router.query?.token) {
      const token = router.query.token as string;
      const verifyEmail = async () => {
        try {
          await CodedraftsApi.verifyEmail(token);
          setIsSuccess(true);
        } catch (error) {
          setIsSuccess(false);
        }
        setIsLoading(false);
      };
      verifyEmail();
    }
  }, [router.query]);

  return (
    <>
      <Header />
      <div className="flex justify-center py-[120px]">
        {!isLoading ? (
          <>
            {isSuccess && router.query?.token ? (
              <div className="flex h-fit flex-col items-center justify-center gap-[50px] rounded-md py-[60px] px-[160px] shadow-md">
                <img src="/svg/Balloon.svg" alt="balloon" />
                <div className="flex w-full flex-col items-center justify-center">
                  <p className="w-fit text-[20px] font-bold">Thành công!</p>
                  <p className="text-[18px]">Email của bạn đã được xác thực</p>
                </div>
                <PrimaryButton
                  text="Quay lại trang đăng nhập"
                  onClick={() => router.push('/login')}
                />
              </div>
            ) : (
              <div className="flex h-fit flex-col items-center justify-center gap-[50px] rounded-md py-[60px] px-[160px] shadow-md">
                <img src="/svg/Danger.svg" alt="Danger" />
                <div className="flex w-full flex-col items-center justify-center">
                  <p className="w-fit text-[20px] font-bold">Thất bại!</p>
                  <p className="text-[18px]">Có lỗi xảy ra, vui lòng thử lại</p>
                </div>
                <PrimaryButton
                  text="Quay lại trang đăng nhập"
                  onClick={() => router.push('/login')}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-fit flex-col items-center justify-center gap-[50px] rounded-md py-[60px] px-[160px] shadow-md">
            <img src="/svg/Loading.svg" alt="Loading" />
            <div className="flex w-full flex-col items-center justify-center">
              <p className="w-fit text-[20px] font-bold">Đang xác thực...</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default VerifyEmailPage;
