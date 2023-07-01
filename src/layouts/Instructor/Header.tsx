import Image from 'next/image';

import { APP_NAME } from '../../shared/constants/app';

const HeaderInstructor = () => {
  return (
    <div className="flex h-[74px] w-full items-center justify-between border-b border-[#A7A7A7] pl-[25px] pr-[82px]">
      <div className="flex items-center gap-2">
        <Image src="/logo-96.png" alt="logo" width={40} height={40} />
        <p className="font-inter text-[20px] font-semibold leading-6">{APP_NAME}</p>
      </div>
    </div>
  );
};

export default HeaderInstructor;
