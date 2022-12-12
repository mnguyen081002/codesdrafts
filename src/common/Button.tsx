import { FC } from "react";

interface IProps {
  icon?: React.ReactNode;
  text: string;
}

const Button:FC<IProps> = (params) => {
  return (
    <button className="flex justify-start py-2 px-3 border border-gray-300 rounded-[4px] gap-2">
      <span>{params.text}</span>
      {params.icon}
    </button>
  );
};

export default Button;
