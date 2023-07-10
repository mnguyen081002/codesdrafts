import { useState } from 'react';

function PrimaryButton({
  text,
  onClick,
  className,
  textClassName,
  hoverBgColor = 'hover:bg-light-dark',
  bgColor = 'bg-light-primary',
  type = 'button',
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  hoverBgColor?: string;
  bgColor?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        className || ''
      } flex cursor-pointer items-center justify-center rounded-md px-10 py-3 transition-colors duration-300 ease-in ${bgColor} ${hoverBgColor}`}
    >
      <p
        className={`${
          textClassName || ''
        }font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] text-white`}
      >
        {text}
      </p>
    </button>
  );
}

function PrimaryOutlineButton({
  text,
  onClick,
  className,
  textClassName,
  textHoverClassName = 'text-light-primary',
  bgHoverColor = 'hover:bg-light-hoverPrimary',
  type = 'button',
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  textHoverClassName?: string;
  bgHoverColor?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${
        className || ''
      } flex cursor-pointer items-center justify-center rounded-md border border-light-primary transition-colors duration-200 ease-in ${bgHoverColor} px-10 py-3 `}
    >
      <p
        className={`${
          textClassName || ''
        } font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] text-light-primary ${
          isHover && textHoverClassName
        }`}
      >
        {text}
      </p>
    </button>
  );
}

export { PrimaryButton, PrimaryOutlineButton };
