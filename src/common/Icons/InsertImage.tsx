import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const InsertImage = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    gId="InsertImage"
    pathId="Vector"
    viewBox="0 0 24 24"
    d="M14.2 11L18 16H6L9 12.1L11.1 14.8L14 11H14.2ZM8.5 11C9.3 11 10 10.3 10 9.5C10 8.7 9.3 8 8.5 8C7.7 8 7 8.7 7 9.5C7 10.3 7.7 11 8.5 11ZM22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6ZM20 8.8V6H4V18H20V8.8Z"
  />
);

export default InsertImage;
