import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const LessonPage = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div>
      <h1>Lesson Page Of Course {id}</h1>
    </div>
  );
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

export default LessonPage;
