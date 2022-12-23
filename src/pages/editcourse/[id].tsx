import EditIcon from "@mui/icons-material/Edit";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import router, { useRouter } from "next/router";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { useEffect, useState } from "react";
import { CodeSmoothApi, CourseResponse } from "../../api/codesmooth-api";
import { Tags } from "../../common/Tags";
import Link from "next/link";
import { generateId } from "../../utils/genId";
import Button from "../../common/Button";

const tagOptions = [
  "React",
  "NextJS",
  "TailwindCSS",
  "NodeJS",
  "ExpressJS",
  "MongoDB",
  "MySQL",
  "GraphQL",
  "TypeScript",
  "JavaScript",
  "HTML",
];
export const defaultCourse = {
  id: generateId(18),
  name: "",
  thumbnail: "",
  summary: "",
  created_at: new Date(),
  updated_at: new Date(),
  detail: "",
  is_published: false,
  price: 0,
  skills: [],
  tags: ["React", "NextJS", "TailwindCSS"],
  target_audience: "Everyone",
  category: [],
};
const Course = (props) => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseResponse>(defaultCourse);

  const [queryLessionPage, setQueryLessionPage] = useState("");
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [isHoverUploadImage, setIsHoverUploadImage] = useState(false);
  const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      const { id, draft } = router.query;

      if (draft) {
        CodeSmoothApi.getCourseById(Number(id)).then((data) => {
          setCourse(data.data);
          let query = "";
          if (data.data.category.length > 0 && data.data.category[0]?.lessions?.length! > 0) {
            query = data.data.category[0]?.lessions[0]?.id! + "?draft=true";
          } else {
            query = generateId(18).toString();
          }
          console.log({ query });
          setQueryLessionPage(query);
        });
      } else {
        setQueryLessionPage(generateId(18).toString());
      }
      if (id) {
        // set course id
        setCourse({ ...course, id: Number(id) });
      }
    }
  }, [router.isReady]);

  const handleSetTags = (tags: string[]) => {
    setCourse({ ...course, tags });
  };

  return (
    <Main
      meta={<Meta title={course.id!.toString()} description="Lorem ipsum" />}
      headerChildren={
        <div className="mr-28 flex flex-1 justify-end">
          <Button
            onClick={async () => {
              let newCourse = { ...course };
              if (thumbnailUpload) {
                const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload!]);
                newCourse = { ...newCourse, thumbnail: uploadRes.data.urls[0] };
              }
              // TODO: loading save
              CodeSmoothApi.saveCourse(newCourse).then((data) => {
                alert("Saved");
              });
            }}
            text="Save"
            className="bg-light-primary text-white"
          />
        </div>
      }
    >
      <div className="flex mt-10 w-full justify-center">
        <div className="w-[50%]">
          <div className="flex justify-start py-5 h-60">
            <div className="w-[50%] px-10 h-full">
              {!thumbnailUpload && !course.thumbnail ? (
                <div className="relative bg-gradient-to-bl from-sky-100 to-blue-400 rounded-normal flex justify-center h-full items-center">
                  <input
                    type="file"
                    className="absolute opacity-0 cursor-pointer z-10 h-12 w-12"
                    onChange={(event) => {
                      if (event.target.files) {
                        setThumbnailUpload(event.target.files[0]);
                      }
                    }}
                  />
                  <div className="rounded-lg bg-white cursor-pointer p-2">
                    <WallpaperIcon style={{ fontSize: "30px", cursor: "pointer" }} />
                  </div>
                </div>
              ) : (
                <div
                  className="relative h-full w-full"
                  onMouseEnter={() => setIsHoverUploadImage(true)}
                  onMouseLeave={() => setIsHoverUploadImage(false)}
                >
                  <img
                    src={thumbnailUpload ? URL.createObjectURL(thumbnailUpload) : course.thumbnail}
                    className="rounded-normal border border-slate-300 h-full w-full object-fill"
                    alt="thumbnail"
                  />

                  {(isHoverUploadImage || isChoosingThumbnail) && (
                    <div className="absolute flex items-center justify-center top-0  h-full w-full">
                      <div className="relative">
                        <input
                          type="file"
                          name="thumbnail"
                          className="absolute opacity-0 cursor-pointer z-10 h-12 w-12"
                          onChange={(event) => {
                            if (event.target.files) {
                              setThumbnailUpload(event.target.files[0]);
                            }
                            setIsChoosingThumbnail(false);
                          }}
                          onClick={(event) => {
                            console.log("event.currentTarget.value");
                            setIsChoosingThumbnail(true);
                            event.currentTarget.value = "";
                          }}
                        />
                        <div className="top-0 rounded-lg bg-white cursor-pointer p-2">
                          <WallpaperIcon style={{ fontSize: "30px", cursor: "pointer" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                onChange={(e) => {
                  setCourse({ ...course, name: e.target.value });
                }}
                placeholder="Give a name to your course"
                className=" placeholder-slate-500 border-none text-lg bg-white"
              />
            </div>
            <input
              type="text"
              value={course.summary}
              onChange={(e) => {
                setCourse({ ...course, summary: e.target.value });
              }}
              placeholder="Give a short description to your course"
              className="pl-8 h-14 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-400"
            />
            <input
              type="text"
              value={course.target_audience}
              onChange={(e) => {
                setCourse({ ...course, target_audience: e.target.value });
              }}
              placeholder="Who is this course for?"
              className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
            <input
              type="text"
              value={course.detail}
              onChange={(e) => {
                setCourse({ ...course, detail: e.target.value });
              }}
              placeholder="What will students learn in this course?"
              className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
            <Tags
              options={tagOptions}
              value={course.tags}
              placeholder="Add tags to your course"
              setValue={(value) => {
                handleSetTags(value);
              }}
              // className="pl-8 rounded-normal outline-none text-base bg-white placeholder-slate-400 border border-slate-300"
            />
            <div className="w-full flex flex-col">
              <span className="text-lg text-slate-500 tracking-widest uppercase font-semibold">
                Lession
              </span>
              <div className="w-full flex items-center justify-center">
                <Link
                  href={`/editlession/${course.id}/${queryLessionPage}`}
                  className="flex items-center w-60 justify-center border border-slate-400 py-2 rounded-normal"
                >
                  <span className="text-xs uppercase">Edit Course Content</span>
                  <EditIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Course;
