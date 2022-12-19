import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeSmoothApi, CodeSmoothApiResponse, CourseResponse } from "../api/codesmooth-api";
import BigCourseCard from "./BigCourseCard";
import SmallCourseCard from "./SmallCourseCard";

const Teach = () => {
  const [listCourses, setListCourses] = useState<CodeSmoothApiResponse<CourseResponse>>({
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
  useEffect(() => {
    CodeSmoothApi.getCourses().then((data) => {
      console.log(data);
      setListCourses(data);
    });
  }, []);

  return (
    <>
      <Link href="/editlesson" className="flex flex-col justify-center my-10 w-[90%] px-[10%]">
        <div className="flex h-[330px] flex-col w-72 rounded hover:shadow-lg duration-500 justify-center items-center cursor-pointer border border-gray-200 bg-gray-200">
          <div className="flex flex-col items-center">
            <AddIcon style={{ fontSize: "100px" }} />
            <p>Create New Course</p>
          </div>
        </div>
      </Link>

      {listCourses.data.map((course: CourseResponse) => {
        return (
          // <Link href={`/editlesson/${course.id}`} className="flex flex-col justify-center my-10 w-[90%] px-[10%]">
          //   <div className="flex h-[330px] flex-col w-72 rounded hover:shadow-lg duration-500 justify-center items-center cursor-pointer border border-gray-200 bg-gray-200">
          //     <div className="flex flex-col items-center">
          //       <p>{course.title}</p>
          //     </div>
          //   </div>
          // </Link>
          <SmallCourseCard
            author="Code Smooth"
            author_avatar="./logo-96.png"
            completed_percent={30}
            id={course.id}
            image_url="https://www.educative.io/cdn-cgi/image/format=auto,width=350,quality=75/v2api/collection/10370001/6289391964127232/image/5627886733099008"
            name={course.name}
            key={course.id}
          />
        );
      })}
    </>
  );
};

export default Teach;
