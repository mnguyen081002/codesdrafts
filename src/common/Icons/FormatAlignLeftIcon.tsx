import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const FormatAlignLeftIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M3 18H9V16H3V18ZM3 11V13H15V11H3ZM3 6V8H21V6H3Z"
  />
);

export default FormatAlignLeftIcon;
