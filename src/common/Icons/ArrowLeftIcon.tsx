import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ArrowLeftIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className="rotate-180 transform"
    pathId="Vector"
    viewBox="0 0 25 25"
    d="M8.94824 17.2812L13.7191 12.5L8.94824 7.71875L10.417 6.25L16.667 12.5L10.417 18.75L8.94824 17.2812Z"
  />
);

export default ArrowLeftIcon;
