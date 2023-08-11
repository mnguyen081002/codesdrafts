import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ArrowRightV2Icon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`flex ${props.className}`}
    pathId="Vector"
    viewBox="0 0 21 20"
    d="M10.4953 3.33337L9.32028 4.50837L13.9703 9.16671H3.82861V10.8334H13.9703L9.32028 15.4917L10.4953 16.6667L17.1619 10L10.4953 3.33337Z"
  />
);

export default ArrowRightV2Icon;
