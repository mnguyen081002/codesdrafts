import { useState } from 'react';

function PrimaryButton({
  text,
  onClick,
  className,
  textClassName,
  hoverBgColor = 'hover:bg-light-dark',
  bgColor = 'bg-light-primary',
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  hoverBgColor?: string;
  bgColor?: string;
}) {
  return (
    <button
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
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  textHoverClassName?: string;
  bgHoverColor?: string;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
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
