import { ExpandMore } from '@mui/icons-material';
import type { FC } from 'react';

import type { CategoryResponse } from '../../api/codesmooth-api';

export interface ILessionNav {
  category: CategoryResponse[];
}
export const LessionNav: FC<ILessionNav> = (props) => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="mx-5 mt-32 flex h-full flex-col gap-6">
        {props.category.map((category) => {
          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{category.title}</div>
                <ExpandMore style={{ fontSize: '30px' }} />
              </div>
              <div className="flex flex-col gap-2">
                {category.lessions.map((l) => {
                  return (
                    <div key={l.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{l.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
