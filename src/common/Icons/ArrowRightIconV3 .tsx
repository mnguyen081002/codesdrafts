import type { IconProps } from './Interface';

const ArrowRightIconV3 = (props: IconProps) => (
  <svg
    width="56"
    height="41"
    viewBox="0 0 56 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={props.onClick}
    className={props.className}
  >
    <rect x="0.799805" y="0.5" width="55.2" height="40" rx="10" fill="#E3E8F4" />
    <g clip-path="url(#clip0_2592_6470)">
      <path
        d="M28.5 12.5L27.09 13.91L32.67 19.5H20.5V21.5H32.67L27.09 27.09L28.5 28.5L36.5 20.5L28.5 12.5Z"
        fill={props.pathFill || '#AAB3CA'}
      />
    </g>
    <defs>
      <clipPath id="clip0_2592_6470">
        <rect width="24" height="24" fill="white" transform="translate(16.5 8.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowRightIconV3;
