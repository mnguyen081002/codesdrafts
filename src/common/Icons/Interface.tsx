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

  onClick?: () => void;

  className?: string;
}

export interface IconProps {
  width?: string;
  height?: string;
  pathFill?: string;
  onClick?: () => void;
  className?: string;
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
  onClick,
  className,
}: BaseIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className={className}
  >
    <g id={gId}>
      <path id={pathId} d={d} fill={pathFill} />
    </g>
  </svg>
);
