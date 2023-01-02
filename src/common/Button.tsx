import type { FC } from 'react';

interface IProps {
  fontIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
  text: string;
  className?: string;
  onClick?: any;
}

const Button: FC<IProps> = (params) => {
  return (
    <button
      className={`${params.className} flex items-center justify-center gap-2 rounded-normal border border-gray-400 px-3 py-2 transition duration-300 ease-in-out hover:shadow-xl`}
      onClick={params.onClick}
    >
      {params.fontIcon}
      <span>{params.text}</span>
      {params.backIcon}
    </button>
  );
};

export default Button;
