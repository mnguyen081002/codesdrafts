import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import router, { useRouter } from "next/router";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { useEffect, useState } from "react";
import { CodeSmoothApi, CourseResponse } from "../../api/codesmooth-api";
const Course = (props) => {
  const router = useRouter();
  const [id, setId] = useState<string | string[]>("");
  const [course, setCourse] = useState<CourseResponse>({
    name: "",
    thumbnail: "",
    summary: "",
    created_at: new Date(),
    updated_at: new Date(),
    detail: "",
    is_published: false,
    price: 0,
    skills: [],
    tags: [],
    target_audience:"Everyone"
  });

  useEffect(() => {
    if (router.isReady) {
      const { id, draft } = router.query;
      console.log(id);

      if (draft) {
        // TODO: call api to get course
        CodeSmoothApi.getCourseById(Number(id)).then((data) => {
          setCourse(data.data);
        })
      }
      if (id) {
        setId(id);
      }
    }
  }, [router.isReady]);

  return (
    <Main meta={<Meta title={id!.toString()} description="Lorem ipsum" />}>
      <div className="flex mt-10 w-full justify-center">
        <div className="w-[50%]">
          <div className="flex justify-start py-5 h-60">
            <div className="w-[50%] px-10 h-full">
              <div className="bg-gradient-to-bl from-sky-100 cursor-pointer to-blue-400 rounded-normal flex justify-center h-full items-center">
                <div className="rounded-lg bg-white p-2">
                  <WallpaperIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <span className="font-semibold">Course Authors:</span>
              <div className="flex justify-start">
                <img src="/logo-96.png" className="h-5 mr-2" alt="" />
                <span>Code Smooth</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col px-5 rounded-normal outline-none text-base h-20 pl-8 border border-slate-400">
              <div className="flex flex-rows w-full justify-between items-center mt-2">
                <span className="tracking-widest uppercase text-xs text-slate-400">
                  Course Name:
                </span>
                <span className="text-slate-300 text-xs"> (required)</span>
              </div>
              <input
                type="text"
                value={course.name}
                placeholder="Give a name to your course"
                className=" placeholder-slate-500 border-none text-lg bg-white"
              />
            </div>
            <input
              type="text"
              value={course.summary}
              placeholder="Give a short description to your course"
              className="pl-8 h-14 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-400"
            />
            <input
              type="text"
              value={course.target_audience}
              placeholder="Who is this course for?"
              className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
            <input
              type="text"
              value={course.detail}
              placeholder="What will students learn in this course?"
              className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
            <input
              type="text"
              value={course.tags}
              placeholder="Add tags to your course"
              className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Course;
