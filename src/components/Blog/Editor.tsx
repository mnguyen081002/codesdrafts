import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { BlogComponentType } from '../../shared/enum/component';
import type { IBlogComponentProps } from '../../shared/interface';
import { BlogInputTextComponent } from '../InputComponent';
import PostCodeEditor from './PostCodeEditor';

const NoSSRInputTextComponent = dynamic(() => Promise.resolve(BlogInputTextComponent), {
  ssr: false,
});

export const BlogComponent: FC<IBlogComponentProps<any>> = (params) => {
  const [type, setType] = useState<BlogComponentType>(params.reference.current.type);
  useEffect(() => {
    setType(params.reference.current.type);
  }, [params.reference.current.type]);
  const [render, setRender] = useState(false);

  const rerender = () => {
    setRender(!render);
  };

  switch (type) {
    case BlogComponentType.Text:
      return (
        <NoSSRInputTextComponent
          rerender={rerender}
          reference={params.reference}
          component={params.reference.current}
          isFirst={params.isFirst}
          isReadOnly={params.isReadOnly}
          setRefs={params.setRefs}
        />
      );
    case BlogComponentType.Code:
      return <PostCodeEditor isReadOnly={params.isReadOnly} reference={params.reference} />;
    default:
      return <></>;
  }
};
