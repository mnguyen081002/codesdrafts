import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import type { ReactNode } from 'react';

import Navigate from '@/common/Navigate';
import Link from 'next/link';

type IMainProps = {
  meta: ReactNode;
  children?: ReactNode;
};

export const Header = () => {
  return (
     <nav className="fixed top-0 z-10 flex h-16 w-full border-0 border-b border-solid border-gray-300 bg-white transition duration-300 ease-in-out dark:border-gray-700 dark:bg-dark-90 sm:h-16 items-center">
        <span className="px-2 flex justify-start items-center gap-2">
          <img src="/logo-96.png" alt="Logo" className="h-8 w-8 ml-4" />
          <span className="font-bold text-lg">Code Smooth</span>
        </span>
        <div className="h-full flex-row pl-8">
          <Navigate />
        </div>
        <div className="flex h-full flex-auto items-center justify-end">
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
        </div>
    </nav>
  );
};

const Main = (props: IMainProps) => {
  return (
    <div>
      <Header/>
      {/* <nav className="fixed top-16 z-50 h-full w-sidebar bg-gray-200 flex">
        <Link
          href="/"
          className="h-20 flex flex-col items-center w-full cursor-pointer py-3 px-1 hover:text-white focus:text-white"
        >
          <AutoStoriesOutlinedIcon style={{ color: "#505050" }} />
          Course
        </Link>
      </nav> */}
      <div className="flex flex-col bg-white pt-16 items-center">
        {props.children}
      </div>
    </div>
  );
};

export { Main };
