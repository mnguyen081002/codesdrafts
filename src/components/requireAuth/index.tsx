import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { PATH_AUTH } from '@/routes/path';

export function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: PATH_AUTH.login,
        },
      };
    }

    return gssp(ctx);
  };
}

export function optionalAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    return gssp(ctx);
  };
}
