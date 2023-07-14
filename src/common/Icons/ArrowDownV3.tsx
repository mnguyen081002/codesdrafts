import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ArrowDownV3Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 19 9"
    d="M16.4122 8.33008L9.63148 2.48281L2.8508 8.33008L0.767845 7.97526L9.63148 0.330078L18.4951 7.97526L16.4122 8.33008Z"
  />
);

export default ArrowDownV3Icon;
