import EditIcon from '@mui/icons-material/Edit';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { CourseResponse } from '../../api/codesmooth-api';
import { CodeSmoothApi } from '../../api/codesmooth-api';
import Button from '../../common/Button';
import { Tags } from '../../common/Tags';
import CourseSkeleton from '../../components/Skeleton/CourseSkeleton';
import { generateId } from '../../utils/genId';

const tagOptions = [
  'React',
  'NextJS',
  'TailwindCSS',
  'NodeJS',
  'ExpressJS',
  'MongoDB',
  'MySQL',
  'GraphQL',
  'TypeScript',
  'JavaScript',
  'HTML',
];
export const defaultCourse = {
  id: generateId(18),
  name: '',
  thumbnail: '',
  summary: '',
  created_at: new Date(),
  updated_at: new Date(),
  detail: '',
  is_published: false,
  price: 0,
  skills: [],
  tags: ['React', 'NextJS', 'TailwindCSS'],
  target_audience: 'Everyone',
  category: [],
};
const Course = (_) => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseResponse>(defaultCourse);

  const [queryLessionPage, setQueryLessionPage] = useState('');
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [isHoverUploadImage, setIsHoverUploadImage] = useState(false);
  const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      if (router.isReady) {
        const { id, draft } = router.query;
        if (draft) {
          setIsDraft(true);
          const data = await CodeSmoothApi.getCourseById(Number(id));
          setCourse(data.data);
          let query = '';
          if (data.data.category.length > 0 && data.data.category[0]?.lessions?.length! > 0) {
            query = `${data.data.category[0]?.lessions[0]?.id!}?draft=true`;
          } else {
            query = generateId(18).toString();
          }
          console.log({ query });
          setQueryLessionPage(query);
        } else {
          setQueryLessionPage(generateId(18).toString());
        }
        setIsLoading(false);
      }
    };
    loadCourse();
  }, [router.isReady]);

  const handleSetTags = (tags: string[]) => {
    setCourse({ ...course, tags });
  };

  const handleDeleteCourse = async () => {
    try {
      await CodeSmoothApi.deleteCourseById(course.id!);
      router.push('/');
    } catch (error) {
      console.log(error);

      alert('Error');
    }
  };

  const handleSaveCourse = async () => {
    setIsDraft(true);

    let newCourse = { ...course };
    if (thumbnailUpload) {
      const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload!]);
      newCourse = { ...newCourse, thumbnail: uploadRes.data.urls[0] };
    }
    // TODO: loading save
    CodeSmoothApi.saveCourse(newCourse).then(() => {
      alert('Saved');
    });
  };

  return (
    <Main
      meta={<Meta title={course.id!.toString()} description="Lorem ipsum" />}
      headerChildren={
        <div className="mr-28 flex flex-1 justify-end">
          <Button
            onClick={handleSaveCourse}
            text="Save"
            className="bg-light-primary text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-sky-500"
          />
        </div>
      }
    >
      <div className="mt-10 flex w-full justify-center">
        {!isLoading ? (
          <div className="w-[50%]">
            <div className="flex h-60 justify-start py-5">
              <div className="h-full w-[50%] px-10">
                {!thumbnailUpload && !course.thumbnail ? (
                  <div className="relative flex h-full items-center justify-center rounded-normal bg-gradient-to-bl from-sky-100 to-blue-400">
                    <input
                      type="file"
                      className="absolute z-10 h-12 w-12 cursor-pointer opacity-0"
                      onChange={(event) => {
                        if (event.target.files) {
                          setThumbnailUpload(event.target.files[0]);
                        }
                      }}
                    />
                    <div className="cursor-pointer rounded-lg bg-white p-2">
                      <WallpaperIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative h-full w-full"
                    onMouseEnter={() => setIsHoverUploadImage(true)}
                    onMouseLeave={() => setIsHoverUploadImage(false)}
                  >
                    <img
                      src={
                        thumbnailUpload ? URL.createObjectURL(thumbnailUpload) : course.thumbnail
                      }
                      className="h-full w-full rounded-normal border border-slate-300 object-fill"
                      alt="thumbnail"
                    />

                    {(isHoverUploadImage || isChoosingThumbnail) && (
                      <div className="absolute top-0 flex h-full w-full  items-center justify-center">
                        <div className="relative">
                          <input
                            type="file"
                            name="thumbnail"
                            className="absolute z-10 h-12 w-12 cursor-pointer opacity-0"
                            onChange={(event) => {
                              if (event.target.files) {
                                setThumbnailUpload(event.target.files[0]);
                              }
                              setIsChoosingThumbnail(false);
                            }}
                            onClick={(event) => {
                              console.log('event.currentTarget.value');
                              setIsChoosingThumbnail(true);
                              event.currentTarget.value = '';
                            }}
                          />
                          <div className="top-0 cursor-pointer rounded-lg bg-white p-2">
                            <WallpaperIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex w-[50%] flex-col">
                <span className="font-semibold">Course Authors:</span>
                <div className="flex justify-start">
                  <img src="/logo-96.png" className="mr-2 h-5" alt="" />
                  <span>Code Smooth</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex h-20 flex-col rounded-normal border border-slate-400 px-5 pl-8 text-base outline-none">
                <div className="flex-rows mt-2 flex w-full items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-slate-400">
                    Course Name:
                  </span>
                  <span className="text-xs text-slate-300"> (required)</span>
                </div>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => {
                    setCourse({ ...course, name: e.target.value });
                  }}
                  placeholder="Give a name to your course"
                  className=" border-none bg-white text-lg placeholder:text-slate-500"
                />
              </div>
              <ReactTextareaAutosize
                value={course.summary}
                onChange={(e) => {
                  setCourse({ ...course, summary: e.target.value });
                }}
                placeholder="Give a short description to your course"
                className="h-14 resize-none rounded-normal border border-slate-400 bg-white py-5 pl-8 text-base outline-none placeholder:text-slate-400"
              />
              <input
                type="text"
                value={course.target_audience}
                onChange={(e) => {
                  setCourse({ ...course, target_audience: e.target.value });
                }}
                placeholder="Who is this course for?"
                className="rounded-normal border border-slate-300 bg-white pl-8 text-base outline-none placeholder:text-slate-400"
              />
              <ReactTextareaAutosize
                value={course.detail}
                onChange={(e) => {
                  setCourse({ ...course, detail: e.target.value });
                }}
                placeholder="What will students learn in this course?"
                className="resize-none rounded-normal border border-slate-300 bg-white py-2 pl-8 text-base outline-none placeholder:text-slate-400"
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
              <div className="flex w-full flex-col">
                <span className="text-lg font-semibold uppercase tracking-widest text-slate-500">
                  Lessions
                </span>
                <div className="flex w-full items-center justify-center">
                  <Link
                    href={`/editlession/${course.id}/${queryLessionPage}`}
                    className="flex w-60 items-center justify-center rounded-normal border border-slate-400 py-2 transition duration-300 hover:scale-110 hover:bg-slate-100"
                  >
                    <span className="text-xs uppercase">Edit Lessions</span>
                    <EditIcon style={{ fontSize: '18px', marginLeft: '10px' }} />
                  </Link>
                </div>
              </div>
              {isDraft && (
                <div className="flex w-full items-center justify-center">
                  <Button
                    className="rounded-normal border border-slate-400 bg-red-500 py-2 text-xs uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
                    text="Delete Course"
                    onClick={handleDeleteCourse}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <CourseSkeleton />
        )}
      </div>
    </Main>
  );
};

export default Course;
