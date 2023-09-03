import { useState } from 'react';

import type { IconProps } from './Interface';

const CreatePostIcon = (props: IconProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      width="108"
      height="108"
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <g filter="url(#filter0_d_2620_5555)">
        <rect
          x="15"
          y="9"
          width="78"
          height="78"
          rx="39"
          fill={isHover ? '#eeeeee' : 'white'}
          shape-rendering="crispEdges"
        />
        <g clip-path="url(#clip0_2620_5555)">
          <path
            d="M40 56.1675V62H45.8325L63.0346 44.7979L57.2021 38.9654L40 56.1675ZM67.5451 40.2875C68.1516 39.6809 68.1516 38.701 67.5451 38.0944L63.9056 34.4549C63.299 33.8484 62.3191 33.8484 61.7125 34.4549L58.8663 37.3012L64.6988 43.1337L67.5451 40.2875Z"
            fill="black"
            fill-opacity="0.77"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2620_5555"
          x="0"
          y="0"
          width="108"
          height="108"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="7.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2620_5555" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2620_5555"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2620_5555">
          <rect width="28" height="28" fill="white" transform="translate(40 34)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CreatePostIcon;
