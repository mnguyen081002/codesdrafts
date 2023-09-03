import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { BlogComponentType } from '../../shared/enum/component';
import type { IBlogComponentProps } from '../../shared/interface';
import { BlogInputTextComponent } from '../InputComponent';

const NoSSRInputTextComponent = dynamic(() => Promise.resolve(BlogInputTextComponent), {
  ssr: false,
});

export const BlogComponent: FC<IBlogComponentProps> = (params) => {
  const [type, setType] = useState<BlogComponentType>(params.reference.current.type);
  useEffect(() => {
    setType(params.reference.current.type);
  }, []);

  switch (type) {
    case BlogComponentType.Text:
      return (
        <NoSSRInputTextComponent
          reference={params.reference}
          component={params.reference.current}
          isFirst={params.isFirst}
          isReadOnly={params.isReadOnly}
          setRefs={params.setRefs}
        />
      );
    default:
      return (
        <NoSSRInputTextComponent
          reference={params.reference}
          component={params.reference.current}
          isFirst={params.isFirst}
          setRefs={params.setRefs}
        />
      );
  }
};
