import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const DragIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 24 25"
    d="M10.9163 18.9987C10.9163 20.1904 9.94134 21.1654 8.74967 21.1654C7.55801 21.1654 6.58301 20.1904 6.58301 18.9987C6.58301 17.807 7.55801 16.832 8.74967 16.832C9.94134 16.832 10.9163 17.807 10.9163 18.9987ZM8.74967 10.332C7.55801 10.332 6.58301 11.307 6.58301 12.4987C6.58301 13.6904 7.55801 14.6654 8.74967 14.6654C9.94134 14.6654 10.9163 13.6904 10.9163 12.4987C10.9163 11.307 9.94134 10.332 8.74967 10.332ZM8.74967 3.83203C7.55801 3.83203 6.58301 4.80703 6.58301 5.9987C6.58301 7.19036 7.55801 8.16536 8.74967 8.16536C9.94134 8.16536 10.9163 7.19036 10.9163 5.9987C10.9163 4.80703 9.94134 3.83203 8.74967 3.83203ZM15.2497 8.16536C16.4413 8.16536 17.4163 7.19036 17.4163 5.9987C17.4163 4.80703 16.4413 3.83203 15.2497 3.83203C14.058 3.83203 13.083 4.80703 13.083 5.9987C13.083 7.19036 14.058 8.16536 15.2497 8.16536ZM15.2497 10.332C14.058 10.332 13.083 11.307 13.083 12.4987C13.083 13.6904 14.058 14.6654 15.2497 14.6654C16.4413 14.6654 17.4163 13.6904 17.4163 12.4987C17.4163 11.307 16.4413 10.332 15.2497 10.332ZM15.2497 16.832C14.058 16.832 13.083 17.807 13.083 18.9987C13.083 20.1904 14.058 21.1654 15.2497 21.1654C16.4413 21.1654 17.4163 20.1904 17.4163 18.9987C17.4163 17.807 16.4413 16.832 15.2497 16.832Z"
  />
);

export default DragIcon;