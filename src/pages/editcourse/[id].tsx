// import EditIcon from '@mui/icons-material/Edit';
// import WallpaperIcon from '@mui/icons-material/Wallpaper';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import ReactTextareaAutosize from 'react-textarea-autosize';

// import { Meta } from '@/layouts/Meta';
// import { Main } from '@/templates/Main';

// import type { SaveCourseRequest } from '../../api/codesmooth-api';
// import { CodeSmoothApi } from '../../api/codesmooth-api';
// import { useAppDispatch } from '../../app/hooks';
// import Button from '../../common/Button';
// import { Tags } from '../../common/Tags';
// import CourseSkeleton from '../../components/Skeleton/CourseSkeleton';
// import { setSnackBar } from '../../features/auth/appSlice';
// import { generateId } from '../../utils/genId';

// const tagOptions = [
//   'React',
//   'NextJS',
//   'TailwindCSS',
//   'NodeJS',
//   'ExpressJS',
//   'MongoDB',
//   'MySQL',
//   'GraphQL',
//   'TypeScript',
//   'JavaScript',
//   'HTML',
// ];
// export const defaultCourse: CourseResponse = {
//   id: generateId(18),
//   name: '',
//   thumbnail: '',
//   summary: '',
//   created_at: new Date(),
//   updated_at: new Date(),
//   will_learns: [],
//   requirements: [],
//   is_published: false,
//   price: 0,
//   skills: [],
//   tags: ['React', 'NextJS', 'TailwindCSS'],
//   target_audience: 'Everyone',
//   category: [],
// };
// const Course = (_) => {
//   const router = useRouter();
//   const [course, setCourse] = useState<CourseResponse>(defaultCourse);

//   const [queryLessonPage, setQueryLessonPage] = useState('');
//   const [thumbnailUpload, setThumbnailUpload] = useState<any>();
//   const [isHoverUploadImage, setIsHoverUploadImage] = useState(false);
//   const [isChoosingThumbnail, setIsChoosingThumbnail] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDraft, setIsDraft] = useState(false);

//   const dispatch = useAppDispatch();
//   // useEffect(() => {
//   //   const loadCourse = async () => {
//   //     setIsLoading(true);
//   //     if (router.isReady) {
//   //       const { id, draft } = router.query;
//   //       if (draft) {
//   //         setIsDraft(true);
//   //         const data = await CodeSmoothApi.getCourseById(Number(id));
//   //         setCourse(data.data);
//   //         let query = '';
//   //         if (data.data.category.length > 0 && data.data.category[0]?.lessons?.length! > 0) {
//   //           query = `${data.data.category[0]?.lessons[0]?.id!}?draft=true`;
//   //         } else {
//   //           query = generateId(18).toString();
//   //         }
//   //         setQueryLessonPage(query);
//   //       } else {
//   //         setQueryLessonPage(generateId(18).toString());
//   //       }
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   loadCourse();
//   // }, [router.isReady]);

//   const handleSetTags = (tags: string[]) => {
//     setCourse({ ...course, tags });
//   };

//   const handleSetWillLearnTags = (tags: string[]) => {
//     setCourse({ ...course, will_learns: tags });
//   };

//   const handleSetRequirementTags = (tags: string[]) => {
//     setCourse({ ...course, requirements: tags });
//   };

//   const handleDeleteCourse = async () => {
//     try {
//       await CodeSmoothApi.deleteCourseById(course.id!);
//       router.push('/');
//     } catch (error) {
//       alert('Error');
//     }
//     dispatch(setSnackBar({ message: 'Delete success', type: 'success' }));
//   };

//   const handleSaveCourse = async () => {
//     setIsDraft(true);

//     let newCourse: SaveCourseRequest = { ...course };
//     if (thumbnailUpload) {
//       const uploadRes = await CodeSmoothApi.uploadFiles([thumbnailUpload!]);
//       newCourse = { ...newCourse, thumbnail: uploadRes.data.urls[0] };
//     }
//     CodeSmoothApi.saveCourse(newCourse).then(() => {
//       dispatch(setSnackBar({ message: 'Save success', type: 'success' }));
//     });
//   };

//   return (
//     <Main
//       meta={<Meta title={course.id!.toString()} description="Lorem ipsum" />}
//       headerChildren={
//         <div className="mr-24 flex flex-1 justify-end">
//           <Button
//             onClick={handleSaveCourse}
//             text="Save"
//             className="rounded-sm border-none bg-light-primary text-white"
//           />
//         </div>
//       }
//     >
//       <div className="mt-10 flex w-full justify-center">
//         {!isLoading ? (
//           <div className=" w-[50%]">
//             <div className="flex h-60 justify-start py-2">
//               <div className="h-full w-[50%] px-5">
//                 {!thumbnailUpload && !course.thumbnail ? (
//                   <div className="relative flex h-full items-center justify-center rounded-normal bg-gradient-to-bl from-sky-100 to-blue-400">
//                     <input
//                       type="file"
//                       className="absolute z-10 h-12 w-12 cursor-pointer opacity-0"
//                       onChange={(event) => {
//                         if (event.target.files) {
//                           setThumbnailUpload(event.target.files[0]);
//                         }
//                       }}
//                     />
//                     <div className="cursor-pointer rounded-lg bg-white p-2">
//                       <WallpaperIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     className="relative h-full"
//                     onMouseEnter={() => setIsHoverUploadImage(true)}
//                     onMouseLeave={() => setIsHoverUploadImage(false)}
//                   >
//                     <img
//                       src={
//                         thumbnailUpload ? URL.createObjectURL(thumbnailUpload) : course.thumbnail
//                       }
//                       className={`${
//                         isHoverUploadImage && 'opacity-50'
//                       } h-full rounded-normal object-contain transition ease-out`}
//                       alt="thumbnail"
//                     />
//                     {(isHoverUploadImage || isChoosingThumbnail) && (
//                       <div className="absolute top-0 flex h-full w-full  items-center justify-center">
//                         <div className="relative">
//                           <input
//                             type="file"
//                             name="thumbnail"
//                             className="absolute z-10 h-12 w-12 cursor-pointer opacity-0"
//                             onChange={(event) => {
//                               if (event.target.files) {
//                                 setThumbnailUpload(event.target.files[0]);
//                               }
//                               setIsChoosingThumbnail(false);
//                             }}
//                             onClick={(event) => {
//                               setIsChoosingThumbnail(true);
//                               event.currentTarget.value = '';
//                             }}
//                           />
//                           <div className="top-0 cursor-pointer rounded-lg bg-white p-2">
//                             <WallpaperIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="flex w-[50%] flex-col">
//                 <span className="font-semibold">Course Authors:</span>
//                 <div className="flex justify-start">
//                   <img src="/logo-96.png" className="mr-2 h-5" alt="" />
//                   <span>Code Smooth</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col gap-5">
//               <div className="flex h-20 flex-col rounded-normal border border-slate-400 px-5 pl-8 text-base outline-none">
//                 <div className="mt-2 flex w-full flex-row items-center justify-between">
//                   <span className="text-xs uppercase tracking-widest text-slate-400">
//                     Course Name:
//                   </span>
//                   <span className="text-xs text-slate-300"> (required)</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={course.name}
//                   onChange={(e) => {
//                     setCourse({ ...course, name: e.target.value });
//                   }}
//                   placeholder="Give a name to your course"
//                   className=" border-none bg-white text-lg placeholder:text-slate-500"
//                 />
//               </div>
//               <ReactTextareaAutosize
//                 value={course.summary}
//                 onChange={(e) => {
//                   setCourse({ ...course, summary: e.target.value });
//                 }}
//                 placeholder="Give a short description to your course"
//                 className="h-14 resize-none rounded-normal border border-slate-400 bg-white py-5 pl-8 text-base outline-none placeholder:text-slate-400"
//               />
//               <input
//                 type="text"
//                 value={course.target_audience}
//                 onChange={(e) => {
//                   setCourse({ ...course, target_audience: e.target.value });
//                 }}
//                 placeholder="Who is this course for?"
//                 className="rounded-normal border border-slate-300 bg-white pl-8 text-base outline-none placeholder:text-slate-400"
//               />
//               <Tags
//                 value={course.will_learns}
//                 placeholder="What will students learn in this course?"
//                 setValue={(value) => {
//                   handleSetWillLearnTags(value);
//                 }}
//               />
//               <Tags
//                 value={course.requirements}
//                 placeholder="What requirements do students need to take this course?"
//                 setValue={(value) => {
//                   handleSetRequirementTags(value);
//                 }}
//               />
//               <Tags
//                 options={tagOptions}
//                 value={course.tags}
//                 placeholder="Add tags to your course"
//                 setValue={(value) => {
//                   handleSetTags(value);
//                 }}
//               />
//               <div className="flex w-full flex-col">
//                 <span className="text-lg font-semibold uppercase tracking-widest text-slate-500">
//                   Lessons
//                 </span>
//                 <div className="flex w-full items-center justify-center">
//                   <Link href={`/editlesson/${course.id}/${queryLessonPage}`}>
//                     <Button
//                       fontIcon={<EditIcon style={{ fontSize: '18px', marginLeft: '10px' }} />}
//                       text="Edit Lesson"
//                       className="border border-slate-400 text-xs uppercase hover:bg-slate-100 hover:shadow-none"
//                     />
//                   </Link>
//                 </div>
//               </div>
//               {isDraft && (
//                 <div className="flex w-full items-center justify-center">
//                   <Button
//                     className="rounded-normal bg-red-500 text-xs uppercase text-white transition duration-300 ease-in-out hover:bg-red-700"
//                     text="Delete Course"
//                     onClick={handleDeleteCourse}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <CourseSkeleton />
//         )}
//       </div>
//     </Main>
//   );
// };

// export default Course;

const Course = () => {
  return <div></div>;
};

export default Course;
