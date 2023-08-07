import { useSession } from 'next-auth/react';

import Header from './Header';
import HeaderPrimary from './HeaderPrimary';

const SessionHeader = () => {
  const session = useSession();

  return session ? <HeaderPrimary /> : <Header />;
};

export default SessionHeader;
