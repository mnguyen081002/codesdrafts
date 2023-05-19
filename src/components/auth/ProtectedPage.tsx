import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { PATH_AUTH } from '@/routes/path';

type ProtectedPageProp = {
  children?: React.ReactNode;
};

const ProtectedPage = ({ children }: ProtectedPageProp) => {
  const { data: session, status: loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push(PATH_AUTH.login); // Redirect to the login page if not authenticated
    }
  }, [session]);

  return <div>{children}</div>;
};

export default ProtectedPage;
