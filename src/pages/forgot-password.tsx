import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { CodedraftsApi } from '../api/codedrafts-api';
import { InputCustom } from '../common/Input';
import { PrimaryButton } from '../components/Button';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const forgotPassword = async () => {
    try {
      await CodedraftsApi.forgotPassword(email);
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {}, [router.query]);

  return (
    <>
      <Header />
      <div className="flex justify-center py-[120px]">
        {isSuccess !== undefined ? (
          <>
            {!isLoading ? (
              <>
                {isSuccess ? (
                  <div className="flex h-fit flex-col items-center justify-center gap-[50px] rounded-md py-[60px] px-[160px] shadow-md">
                    <img src="/svg/Balloon.svg" alt="balloon" />
                    <div className="flex w-full flex-col items-center justify-center">
                      <p className="w-fit text-[20px] font-bold">Thành công!</p>
                      <p className="text-[18px]">Vui lòng kiểm tra email của bạn</p>
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
          </>
        ) : (
          <div className="flex h-fit flex-col items-center justify-center gap-[50px] rounded-md py-[60px] px-[160px] shadow-md">
            <p className="text-[25px] font-bold">Quên mật khẩu</p>
            <div className="flex w-full flex-col justify-center gap-[10px]">
              <p className="w-fit text-[18px] font-medium">Nhập email của bạn</p>
              <InputCustom
                noResize
                name="email"
                className="h-[50px] w-[400px] rounded-md border-[1px] border-[#e0e0e0] px-[20px] py-[10px]"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <PrimaryButton text="Xác nhận" onClick={forgotPassword} />
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
