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
      className={`flex items-center justify-center gap-2 rounded-sm px-3 py-2 transition duration-300 ease-in-out hover:shadow-xl ${params.className}`}
      onClick={params.onClick}
    >
      {params.fontIcon}
      <span>{params.text}</span>
      {params.backIcon}
    </button>
  );
};

export default Button;
