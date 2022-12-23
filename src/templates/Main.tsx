import Link from 'next/link';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import Navigate from '@/common/Navigate';

type IMainProps = {
  meta: ReactNode;
  children?: ReactNode;
  headerChildren?: ReactNode;
};

export const Header: FC<PropsWithChildren> = (props) => {
  return (
    <nav className="fixed top-0 z-10 flex h-16 w-full items-center border-0 border-b border-solid border-gray-300 bg-white transition duration-300 ease-in-out dark:border-gray-700 dark:bg-dark-90 sm:h-16">
      <Link href="/" className="flex items-center justify-start gap-2 px-2">
        <img src="/logo-96.png" alt="Logo" className="ml-4 h-8 w-8" />
        <span className="text-lg font-bold">Code Smooth</span>
      </Link>
      <div className="h-full flex-row pl-8">
        <Navigate />
      </div>
      {props.children}
      {/* <div className="flex h-full flex-auto items-center justify-end">
          <button className="mr-2 gap-x-2.5 lg:flex">
            <span>
              <SearchIcon />
            </span>
            <span>Search</span>
          </button>
          <div className="mx-4 h-8 border-0 border-l border-solid border-gray-200 dark:border-dark-90 lg:block"></div>
          <div className="mx-2 flex h-[full] w-[38px] cursor-pointer items-center p-1">
            <img
              className="shrink-0 rounded-full bg-gray-400 dark:bg-gray-900 "
              src="https://avatars.githubusercontent.com/u/76799726?v=4"
              alt=""
            />
          </div>
        </div> */}
    </nav>
  );
};

const Main = (props: IMainProps) => {
  return (
    <div>
      <Header>{props.headerChildren}</Header>
      <div className="flex h-screen flex-col items-center bg-white pt-16">{props.children}</div>
    </div>
  );
};

export { Main };
