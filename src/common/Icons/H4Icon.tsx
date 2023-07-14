import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const H4Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M10.2691 18.5V5.9H12.6091V18.5H10.2691ZM2.18712 18.5V5.9H4.52712V18.5H2.18712ZM3.15912 13.316V11.12H11.4031V13.316H3.15912ZM19.4115 19.346H20.7795V20.714H19.4115V19.346ZM16.2975 19.958L16.0095 19.346H18.5835L18.1515 19.796V16.988L18.6735 17.186L16.2975 19.958ZM19.6995 22.136H18.0435V20.282L18.4035 20.714H15.4695L15.1455 19.4L18.2415 15.602H19.6995V22.136Z"
  />
);

export default H4Icon;
