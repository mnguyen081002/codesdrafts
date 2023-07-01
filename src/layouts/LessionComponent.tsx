import type { FC } from 'react';

import { CodeComponent } from '../components/CodeComponent';
import { InputTextComponent } from '../components/InputComponent';
import { ComponentType } from '../shared/enum/component';
import type { ICodeComponent, IComponentProps, ITextComponent } from '../shared/interface';

export const LessonComponent: FC<IComponentProps> = (params) => {
  switch (params.component.type) {
    case ComponentType.Text:
      return (
        <InputTextComponent
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ITextComponent}
          index={params.index}
          isLast={params.isLast}
          isFocus={params.isFocus}
          isReadOnly={params.isReadOnly}
        />
      );
    case ComponentType.Code:
      return (
        <CodeComponent
          isLast={params.isLast}
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ICodeComponent}
          index={params.index}
          isFocus={params.isFocus}
          isReadOnly={params.isReadOnly}
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
