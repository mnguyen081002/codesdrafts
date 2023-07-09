import { useRouter } from 'next/router';

const LessonPage = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div>
      <h1>Lesson Page Of Course {id}</h1>
    </div>
  );
};

export default LessonPage;
