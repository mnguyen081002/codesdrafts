// pages/Report.tsx
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

const Report = ({ reportHtml }) => {
  console.log(reportHtml);
  const [repo, setRepo] = useState<string | string[] | undefined>('');

  return <div dangerouslySetInnerHTML={{ __html: `${reportHtml}` }} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Report;
