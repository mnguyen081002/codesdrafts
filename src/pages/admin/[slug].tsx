import { useRouter } from 'next/router';

import { requireAuth } from '../../components/requireAuth';
import { AdminLayout, mapAdminPage } from '../../layouts/Admin/Admin';

const ManageAdmin = () => {
  // get query params
  const router = useRouter();

  const { slug } = router.query;

  // if query params change, update the page
  return (
    <div className="flex h-[860px] flex-1 overflow-y-auto">{mapAdminPage[slug as string]}</div>
  );
};

const Manage = () => {
  return (
    <AdminLayout>
      <ManageAdmin />
    </AdminLayout>
  );
};

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});

export default Manage;
