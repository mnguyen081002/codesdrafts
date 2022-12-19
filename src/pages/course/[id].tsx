import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useRouter } from "next/router";

const Course = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title={id!.toString()} description="Lorem ipsum" />}>
      <h1 className="capitalize">{id}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eos earum doloribus,
        quibusdam magni accusamus vitae! Nisi, sunt! Aliquam iste expedita cupiditate a quidem culpa
        eligendi, aperiam saepe dolores ipsum!
      </p>
    </Main>
  );
};

export default Course;
