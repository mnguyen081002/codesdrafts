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
    <div
      onClick={onClick}
      className={`${
        className || ''
      } flex cursor-pointer items-center justify-center rounded-md px-10 py-3 transition-colors ${bgColor} ${hoverBgColor}`}
    >
      <p
        className={`${
          textClassName ||
          'font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] text-white'
        } `}
      >
        {text}
      </p>
    </div>
  );
}

function PrimaryOutlineButton({
  text,
  onClick,
  className,
  textClassName,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      // className={`${
      //   className || ''
      // } flex cursor-pointer items-center justify-center rounded-md border border-light-primary px-10 py-3`}
      className={`${
        className || ''
      } flex cursor-pointer items-center justify-center rounded-md border border-light-primary transition-colors duration-300 ease-in ${
        !isHover ? 'bg-white' : 'bg-light-hoverPrimary'
      } px-10 py-3 `}
    >
      <p
        className={`${
          textClassName || ''
        } font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] ${
          isHover ? 'text-light-primary' : 'text-light-primary'
        }`}
      >
        {text}
      </p>
    </button>
  );
}

export { PrimaryButton, PrimaryOutlineButton };