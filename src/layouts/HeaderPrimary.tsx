import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import DropdownList from '../components/DropdownList';
import MenuUser from './MenuUser';

function HeaderNavButton({ label, href }) {
  return (
    <Link
      className="flex items-center px-[18px] py-[6px] text-[16px] font-normal leading-[24px] tracking-[0.15px]"
      href={href}
    >
      {label}
    </Link>
  );
}

export const HeaderNavbar = () => {
  return (
    <div className="flex">
      <HeaderNavButton label={'Trang chủ'} href={'/home'}></HeaderNavButton>
      <DropdownList label={'Khóa học'} />
      <HeaderNavButton label={'Blog'} href={'/blog'}></HeaderNavButton>
      <HeaderNavButton label={'Liên hệ'} href={'/contact'}></HeaderNavButton>
    </div>
  );
};

const HeaderPrimary = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const handleRouteChange = (url, { shallow }) => {
    if (shallow) return;
    setProgress(10);
  };

  const handleRouteComplete = (url, { shallow }) => {
    if (shallow) return;
    setProgress(100);
  };

  router.events?.on('routeChangeStart', handleRouteChange);
  router.events?.on('routeChangeComplete', handleRouteComplete);
  return (
    <>
      <div className="sticky top-0 z-30 flex h-[64px] w-full items-center justify-between bg-white pl-[30px] pr-[40px] shadow">
        <Link href={'/home'}>
          <Image src="/svg/logo/new-logo-white.svg" alt="logo" width={180} height={50} />
        </Link>
        <HeaderNavbar />
        <div className=" flex h-[45px] w-[1100px] rounded-lg border border-light-border px-[12px]">
          <input
            className="border-none bg-white"
            placeholder="Tìm kiếm"
            // rightSection={
            //   <Image src="/images/home/Adornment-End.svg" alt="search" width={20} height={20} />
            // }
          />
          <Image src="/images/home/Adornment-End.svg" alt="search" width={25} height={25} />
        </div>
        <MenuUser />
      </div>
      <LoadingBar color="#1363DF" progress={progress} onLoaderFinished={() => setProgress(0)} />
    </>
  );
};
export default HeaderPrimary;
