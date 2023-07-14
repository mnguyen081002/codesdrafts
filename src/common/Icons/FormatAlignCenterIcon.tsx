import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const FormatAlignCenterIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M9 18H15V16H9V18ZM6 11V13H18V11H6ZM3 6V8H21V6H3Z"
  />
);

export default FormatAlignCenterIcon;
