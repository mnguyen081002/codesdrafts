import React from 'react';

import type { IconProps } from './Interface';
import { BaseSVGIcon } from './Interface';

const ColumnChartIcon = (props: IconProps) => {
  return (
    <BaseSVGIcon
      {...props}
      gId="ColumnChart"
      pathId="Vector"
      viewBox="0 0 25 25"
      d="M19.7917 3.125H5.20833C4.0625 3.125 3.125 4.0625 3.125 5.20833V19.7917C3.125 20.9375 4.0625 21.875 5.20833 21.875H19.7917C20.9375 21.875 21.875 20.9375 21.875 19.7917V5.20833C21.875 4.0625 20.9375 3.125 19.7917 3.125ZM19.7917 19.7917H5.20833V5.20833H19.7917V19.7917ZM7.29167 10.4167H9.375V17.7083H7.29167V10.4167ZM11.4583 7.29167H13.5417V17.7083H11.4583V7.29167ZM15.625 13.5417H17.7083V17.7083H15.625V13.5417Z"
    />
  );
};
export default ColumnChartIcon;
