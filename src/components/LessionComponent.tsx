import type { FC } from 'react';

import type { ICodeComponent, IComponentProps, ITextComponent } from '../shared/interface';
import { CodeComponent } from './CodeComponent';
import { InputTextComponent } from './InputComponent';

export const LessionComponent: FC<IComponentProps> = (params) => {
  switch (params.component.type) {
    case 'Text':
      return (
        <InputTextComponent
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ITextComponent}
          index={params.index}
          isLast={params.isLast}
          isFocus={params.isFocus}
        />
      );
    case 'Code':
      return (
        <CodeComponent
          isLast={params.isLast}
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ICodeComponent}
          index={params.index}
          isFocus={params.isFocus}
        />
      );
    default:
      return (
        <InputTextComponent
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ITextComponent}
          index={params.index}
          isLast={params.isLast}
          isFocus={params.isFocus}
        />
      );
  }
};
