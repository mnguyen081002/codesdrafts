import { useSession } from 'next-auth/react';

import Header from './Header';
import HeaderPrimary from './HeaderPrimary';

const SessionHeader = () => {
  const session: any = useSession();

  return session.status !== 'unauthenticated' ? <HeaderPrimary /> : <Header />;
};

export default SessionHeader;
