// icons
import { Icon } from '@iconify/react';
// @mui
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import { forwardRef } from 'react';

//
import type { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
}

// eslint-disable-next-line react/display-name
const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

export default Iconify;
