import { useState } from 'react';

function PrimaryButton({
  text,
  onClick,
  className,
  textClassName,
  hoverBgColor = 'hover:bg-light-dark',
  bgColor = 'bg-light-primary',
  type = 'button',
  startIcon,
  endIcon,
  isOrginalPadding = true,
  customHeightWidthTailWind,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  hoverBgColor?: string;
  bgColor?: string;
  type?: 'button' | 'submit' | 'reset';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isOrginalPadding?: boolean;
  customHeightWidthTailWind?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${className || ''} flex  cursor-pointer items-center justify-center rounded-md ${
        isOrginalPadding ? 'px-10 py-3' : ''
      }
      ${customHeightWidthTailWind}
      transition-colors duration-300 ease-in ${bgColor} ${hoverBgColor}`}
    >
      {startIcon && <div className="mr-2">{startIcon}</div>}

      <p
        className={`${
          textClassName || 'font-semibold'
        } font-lexend-deca leading-5 tracking-[0.15px] text-white`}
      >
        {text}
      </p>
      {endIcon && <div className="ml-2">{endIcon}</div>}
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
  disabled,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  textHoverClassName?: string;
  bgHoverColor?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
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
