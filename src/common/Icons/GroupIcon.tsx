import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const GroupIcon = (props: IconProps) => (
  <BaseSVGIcon
    {...props}
    gId="Group"
    pathId="Vector"
    viewBox="0 0 25 25"
    d="M9.37467 14.3226C6.93717 14.3226 2.08301 15.5413 2.08301 17.9684V19.7913H16.6663V17.9684C16.6663 15.5413 11.8122 14.3226 9.37467 14.3226ZM4.52051 17.708C5.39551 17.1038 7.51009 16.4059 9.37467 16.4059C11.2393 16.4059 13.3538 17.1038 14.2288 17.708H4.52051ZM9.37467 12.4997C11.3851 12.4997 13.0205 10.8643 13.0205 8.85384C13.0205 6.84342 11.3851 5.20801 9.37467 5.20801C7.36426 5.20801 5.72884 6.84342 5.72884 8.85384C5.72884 10.8643 7.36426 12.4997 9.37467 12.4997ZM9.37467 7.29134C10.2393 7.29134 10.9372 7.98926 10.9372 8.85384C10.9372 9.71842 10.2393 10.4163 9.37467 10.4163C8.51009 10.4163 7.81217 9.71842 7.81217 8.85384C7.81217 7.98926 8.51009 7.29134 9.37467 7.29134ZM16.708 14.3851C17.9163 15.2601 18.7497 16.4268 18.7497 17.9684V19.7913H22.9163V17.9684C22.9163 15.8643 19.2705 14.6663 16.708 14.3851ZM15.6247 12.4997C17.6351 12.4997 19.2705 10.8643 19.2705 8.85384C19.2705 6.84342 17.6351 5.20801 15.6247 5.20801C15.0622 5.20801 14.5413 5.34342 14.0622 5.57259C14.7184 6.49967 15.1038 7.63509 15.1038 8.85384C15.1038 10.0726 14.7184 11.208 14.0622 12.1351C14.5413 12.3643 15.0622 12.4997 15.6247 12.4997Z"
  />
);

export default GroupIcon;