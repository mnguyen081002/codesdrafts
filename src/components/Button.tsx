function PrimaryButton({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        className || ''
      } flex h-[60px] w-[310px] cursor-pointer items-center justify-center rounded-md bg-light-primary`}
    >
      <p className="font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] text-white">
        {text}
      </p>
    </div>
  );
}

function PrimaryOutlineButton({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        className || ''
      } flex w-fit cursor-pointer items-center justify-center rounded-md border border-light-primary px-10 py-3`}
    >
      <p className="font-lexend-deca text-base font-semibold leading-5 tracking-[0.15px] text-light-primary">
        {text}
      </p>
    </div>
  );
}

export { PrimaryButton, PrimaryOutlineButton };
