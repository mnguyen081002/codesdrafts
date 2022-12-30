import type { FC } from 'react';

interface IProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  onClick?: any;
}

const Button: FC<IProps> = (params) => {
  return (
    <button
      className={` ${params.className} flex h-12 items-center justify-center gap-2 rounded-normal border border-gray-300 px-3 transition duration-300 ease-in-out hover:shadow-xl`}
      onClick={params.onClick}
    >
      <span>{params.text}</span>
      {params.icon}
    </button>
  );
};

export default Button;
