import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const H1Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M10.2691 18.5V5.9H12.6091V18.5H10.2691ZM2.18712 18.5V5.9H4.52712V18.5H2.18712ZM3.15912 13.316V11.12H11.4031V13.316H3.15912ZM16.6575 22.136V17.078L16.8375 17.546L15.8655 18.158L15.1635 16.862L17.0535 15.746H18.2595V22.136H17.4675C17.3355 22.136 17.2035 22.136 17.0715 22.136C16.9395 22.136 16.8015 22.136 16.6575 22.136Z"
  />
);

export default H1Icon;
