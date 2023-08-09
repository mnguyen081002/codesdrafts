import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import CodeIcon from '../common/Icons/CodeIcon';
import { ComponentType } from '../shared/enum/component';
import type { ICodeComponent, IComponentPropsV2, ITextComponent } from '../shared/interface';
import { CodeComponent } from './CodeComponent';
import { InputTextComponentV2 as InputTextComponent } from './InputComponent';

const NoSSRInputTextComponent = dynamic(() => Promise.resolve(InputTextComponent), {
  ssr: false,
});

export const LessonComponent: FC<IComponentPropsV2> = (params) => {
  const [type, setType] = useState<ComponentType>(params.reference.current.type);
  useEffect(() => {
    setType(params.reference.current.type);
  }, []);

  switch (type) {
    case ComponentType.Text:
      return (
        <NoSSRInputTextComponent
          reference={params.reference as React.MutableRefObject<ITextComponent>}
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.reference.current as ITextComponent}
          index={params.index}
          isReadOnly={params.isReadOnly}
          setRefs={params.setRefs}
          rightOptions={
            <>
              <CodeIcon className="cursor-pointer" onClick={() => setType(ComponentType.Code)} />
            </>
          }
        />
      );
    case ComponentType.Code:
      return (
        <CodeComponent
          reference={params.reference as React.MutableRefObject<ICodeComponent>}
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.reference.current as ICodeComponent}
          index={params.index}
          isReadOnly={params.isReadOnly}
        />
      );
    default:
      return (
        <NoSSRInputTextComponent
          reference={params.reference as React.MutableRefObject<ITextComponent>}
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.reference.current as ITextComponent}
          index={params.index}
          setRefs={params.setRefs}
          rightOptions={
            <>
              <CodeIcon className="cursor-pointer" onClick={() => setType(ComponentType.Code)} />
            </>
          }
        />
      );
  }
};
