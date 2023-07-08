// import type { FC } from 'react';

// import type { CategoryResponse } from '../../api/codesmooth-api';
// import { CategoryNav } from './CategoryNav';

// export interface ILessonNav {
//   categories?: CategoryResponse[];
//   onClickLesson?: (lessonId: number) => void;
//   editMode?: boolean;
//   className?: string;
// }
// export const LessonNav: FC<ILessonNav> = (props) => {
//   return (
//     <div className={`${props.className} flex flex-1 flex-col overflow-y-auto pb-10`}>
//       {props.categories?.map((category, index) => {
//         return (
//           <CategoryNav
//             editMode={props.editMode}
//             onClickLesson={props.onClickLesson}
//             key={category.id}
//             category={category}
//             index={index}
//           />
//         );
//       })}
//     </div>
//   );
// };

const L = () => {
  return <div></div>;
};

export default L;
