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
      className={`flex items-center justify-center gap-2 rounded-[4px] border border-gray-300 py-2 px-3 ${params.className}`}
      onClick={params.onClick}
    >
      <span>{params.text}</span>
      {params.icon}
    </button>
  );
};

export default Button;
