import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ArrowLeftV2Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`flex rotate-180 transform ${props.className}`}
    pathId="Vector"
    viewBox="0 0 25 25"
    d="M10.0002 3.64355L8.82516 4.81855L13.4752 9.47689H3.3335V11.1436H13.4752L8.82516 15.8019L10.0002 16.9769L16.6668 10.3102L10.0002 3.64355Z"
  />
);

export default ArrowLeftV2Icon;
