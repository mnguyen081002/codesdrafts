import AddIcon from "@mui/icons-material/Add";
import course from "next-seo/lib/jsonld/course";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { CodeSmoothApi, CodeSmoothApiResponseList, CourseResponse } from "../api/codesmooth-api";
import { generateId } from "../utils/genId";
import SmallCourseCard from "./SmallCourseCard";

const Teach = () => {
  const [listCourses, setListCourses] = useState<CodeSmoothApiResponseList<CourseResponse>>({
    data: [],
    message: "",
    meta: {
      hasNextPage: false,
      hasPreviousPage: false,
      page: 0,
      itemCount: 0,
      pageCount: 0,
      take: 0,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    CodeSmoothApi.getListCourses()
      .then((data) => {
        console.log(data);
        setListCourses(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 justify-center items-center flex-wrap gap-5 mt-16">
        <Link
          href={`/course/${generateId(18)}`}
          className="flex h-[370px] flex-col w-72 rounded hover:shadow-lg duration-500 justify-center items-center cursor-pointer border border-gray-200 bg-gray-200"
        >
          <div className="flex flex-col items-center">
            <AddIcon style={{ fontSize: "100px" }} />
            <p>Create New Course</p>
          </div>
        </Link>

        {isLoading
          ? [...Array(9)].map((item) => {
              return <SmallCourseCard isLoading={true} />;
            })
          : listCourses.data.map((course: CourseResponse) => {
              return (
                <SmallCourseCard
                  isLoading={isLoading}
                  author="Code Smooth"
                  author_avatar="./logo-96.png"
                  completed_percent={30}
                  id={course.id!}
                  thumbnail={course.thumbnail}
                  name={course.name}
                  key={course.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default Teach;
