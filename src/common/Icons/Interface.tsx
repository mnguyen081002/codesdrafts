export interface BaseIconProps {
  width?: string;

  height?: string;

  fill?: string;

  viewBox?: string;

  children?: React.ReactNode;

  d?: string;

  gId?: string;

  pathId?: string;

  pathFill?: string;
}

export interface IconProps {
  width?: string;
  height?: string;
  pathFill?: string;
}

export const BaseSVGIcon = ({
  width = '25',
  height = '25',
  fill = 'none',
  viewBox = '0 0 25 25',
  d,
  children,
  gId,
  pathId,
  pathFill = '#000',
}: BaseIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id={gId}>
      <path id={pathId} d={d} fill={pathFill} />
    </g>
  </svg>
);
