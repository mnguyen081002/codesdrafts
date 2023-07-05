import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ERROR_TOKEN } from '@/routes/path';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session?.expires === ERROR_TOKEN) {
      signOut();
    }
  }, [session]);
  return <>{children}</>;
};

export default Auth;
