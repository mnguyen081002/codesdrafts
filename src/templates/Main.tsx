import { CheckCircle, ErrorOutlineOutlined } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';
import Link from 'next/link';
import type { FC, PropsWithChildren, ReactNode, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

import Navigate from '@/common/Navigate';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { CustomSnackbar } from '../features/auth/appSlice';
import { closeSnackBar, selectSnackBar } from '../features/auth/appSlice';

type IMainProps = {
  meta: ReactNode;
  children?: ReactNode;
  headerChildren?: ReactNode;
  isLoading?: boolean;
};

export const Header: FC<PropsWithChildren> = (props) => {
  return (
    <nav className="fixed top-0 z-10 flex h-14 w-full items-center border-0 border-b border-solid border-gray-300 bg-white shadow-md transition duration-300 ease-in-out">
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

const CustomSnackBar = () => {
  const snackbar = useAppSelector<CustomSnackbar>(selectSnackBar);
  const dispatch = useAppDispatch();
  const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
    dispatch(closeSnackBar());
  };

  switch (snackbar.type) {
    case 'success':
      return (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbar.openSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <div className="flex h-14 w-72 items-center justify-start gap-4 rounded-lg border border-gray-300 bg-white py-3 px-4 shadow-forfun">
            <CheckCircle className="text-green-500" />
            <span>{snackbar.message}</span>
          </div>
        </Snackbar>
      );

    case 'error':
      return (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbar.openSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <div className="flex h-14 w-72 items-center justify-start gap-4 rounded-lg border border-gray-300 bg-light-error-background py-3 px-4 shadow-forfun">
            <ErrorOutlineOutlined className="text-light-error-main" />
            <span className="text-light-error-content">{snackbar.message}</span>
          </div>
        </Snackbar>
      );

    default:
      return (
        <Snackbar open={snackbar.openSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      );
  }
};

const Main = (props: IMainProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
    const timer = setInterval(() => {
      if (progress < 90) {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }
      if (!props.isLoading) {
        console.log('clear2');
        setProgress(0);
        clearInterval(timer);
      }
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [props.isLoading]);

  return (
    <div>
      <Header>{props.headerChildren}</Header>
      <div className="flex flex-col items-center bg-white pt-14">{props.children}</div>
      {props.isLoading && (
        <div className="fixed top-0 left-0 z-50 h-1 w-full">
          <div
            className="h-full w-[0%] bg-blue-700 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <CustomSnackBar />
    </div>
  );
};

export { Main };
