import type { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';
import { Home } from '@/screens';

export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
