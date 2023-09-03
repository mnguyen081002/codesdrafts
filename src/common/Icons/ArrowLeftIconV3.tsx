import type { IconProps } from './Interface';

const ArrowLeftIconV3 = (props: IconProps) => (
  <svg
    width="56"
    height="41"
    viewBox="0 0 56 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={props.onClick}
  >
    <rect y="0.5" width="55.2" height="40" rx="10" fill="#EFF2FB" />
    <g clip-path="url(#clip0_2592_6458)">
      <path
        d="M35.7002 19.5H23.5302L29.1202 13.91L27.7002 12.5L19.7002 20.5L27.7002 28.5L29.1102 27.09L23.5302 21.5H35.7002V19.5Z"
        fill={props.pathFill || '#AAB3CA'}
      />
    </g>
    <defs>
      <clipPath id="clip0_2592_6458">
        <rect width="24" height="24" fill="white" transform="translate(15.7002 8.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowLeftIconV3;
