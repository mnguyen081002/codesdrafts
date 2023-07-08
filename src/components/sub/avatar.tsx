import Image from 'next/image';

export interface AvatarProps {
  dot?: boolean;
  w?: number;
  h?: number;
  url?: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div className="relative">
      <Image
        className="cursor-pointer"
        src={`${props.url || '/images/home/Avatar.png'}`}
        alt="search"
        width={props.w ?? 40}
        height={props.h ?? 40}
      />
      {props.dot && (
        <div className="absolute top-0 -right-1 h-[14px] w-[14px] rounded-full bg-light-primary"></div>
      )}
    </div>
  );
};
