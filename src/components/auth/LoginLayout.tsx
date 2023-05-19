import type { ReactNode } from 'react';

import { StyledContent, StyledRoot } from './styles';

type Props = {
  children: ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return (
    <StyledRoot>
      <StyledContent>{children}</StyledContent>
    </StyledRoot>
  );
}
