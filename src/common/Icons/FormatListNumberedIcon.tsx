import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const FormatListNumberedIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M2.5 16H4.5V16.5H3.5V17.5H4.5V18H2.5V19H5.5V15H2.5V16ZM3.5 9H4.5V5H2.5V6H3.5V9ZM2.5 11H4.3L2.5 13.1V14H5.5V13H3.7L5.5 10.9V10H2.5V11ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z"
  />
);

export default FormatListNumberedIcon;
