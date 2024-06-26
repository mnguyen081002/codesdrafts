import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const DisLikeIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    className={`${props.className}`}
    pathId="Vector"
    viewBox="0 0 16 16"
    d="M10.0001 2H4.00008C3.44675 2 2.97341 2.33333 2.77341 2.81333L0.760081 7.51333C0.700081 7.66667 0.666748 7.82667 0.666748 8V9.33333C0.666748 10.0667 1.26675 10.6667 2.00008 10.6667H6.20675L5.57341 13.7133L5.55341 13.9267C5.55341 14.2 5.66675 14.4533 5.84675 14.6333L6.55341 15.3333L10.9467 10.94C11.1867 10.7 11.3334 10.3667 11.3334 10V3.33333C11.3334 2.6 10.7334 2 10.0001 2ZM12.6667 2V10H15.3334V2H12.6667Z"
  />
);

export default DisLikeIcon;
