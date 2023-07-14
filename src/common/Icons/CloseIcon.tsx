import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const CloseIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 23 22"
    d="M4.52877 2.77734L3.27752 4.02859L10.2488 10.9998L3.23627 18.0261L4.47377 19.2636L11.5 12.2511L18.5125 19.2636L19.7638 18.0123L12.7513 10.9998L19.7225 4.02859L18.4713 2.77734L11.5 9.74859L4.52877 2.77734Z"
  />
);

export default CloseIcon;
