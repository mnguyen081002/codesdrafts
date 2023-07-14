import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const FormatAlignRightIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M21 18H15V16H21V18ZM21 11V13H9V11H21ZM21 6V8H3V6H21Z"
  />
);

export default FormatAlignRightIcon;
