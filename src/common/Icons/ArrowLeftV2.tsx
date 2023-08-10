import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ArrowLeftV2Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`flex ${props.className}`}
    pathId="Vector"
    viewBox="0 0 21 20"
    d="M10.495 16.6666L11.67 15.4916L7.01996 10.8333H17.1616V9.16663H7.01996L11.67 4.50829L10.495 3.33329L3.82829 9.99996L10.495 16.6666Z"
  />
);

export default ArrowLeftV2Icon;
