import { useState } from 'react';

const BottomOutlineNavbarButton = ({
  isSelected,
  title,
  className,
  onClick,
}: {
  isSelected?: boolean;
  title: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className="z-20 cursor-pointer flex-col" onClick={onClick}>
      <p
        className={`${
          className || ''
        } mb-[20px] w-fit px-[10px] font-lexend-deca text-[22px] font-normal capitalize  leading-[22px] ${
          isSelected ? 'text-light-primary' : 'text-[#757575]'
        }`}
      >
        {title}
      </p>
      {isSelected && <div className="h-[3px] bg-light-primary" />}
    </div>
  );
};

function UnderlineNavbar({
  navs,
}: {
  navs: {
    title: string;
    className?: string;
  }[];
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="relative flex w-full">
      {navs.map((e, i) => {
        return (
          <BottomOutlineNavbarButton
            key={i}
            isSelected={selected === i}
            className={e.className}
            title={e.title}
            onClick={() => setSelected(i)}
          />
        );
      })}
      <div className="absolute top-[43px] z-10 h-[3px] w-full bg-light-border" />
    </div>
  );
}

export { BottomOutlineNavbarButton, UnderlineNavbar };
