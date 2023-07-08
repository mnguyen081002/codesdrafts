// import CodeIcon from '@mui/icons-material/Code';
// import DragHandleIcon from '@mui/icons-material/DragHandle';
// import { Tooltip } from '@mui/material';
// import type { FC } from 'react';
// import { useState } from 'react';

// import { useAppDispatch } from '../app/hooks';
// import {
//   addComponent,
//   setComponent,
//   setComponentType,
//   setFocus,
// } from '../features/auth/LessonSlice';
// import { ComponentType } from '../shared/enum/component';
// import type { IBaseComponentProps, LessonComponentProps } from '../shared/interface';

// export const BaseComponent: FC<IBaseComponentProps> = (params) => {
//   const [isHover, setIsHover] = useState(false);
//   const [draggable, setDraggable] = useState(false);
//   const dispatch = useAppDispatch();
//   const handleAddComponent = () => {
//     dispatch(addComponent({ type: 'Text', content: { html: '' } }));
//   };

//   const onMouseEnter = () => {
//     setIsHover(true);
//   };

//   const onMouseLeave = () => {
//     setIsHover(false);
//   };
//   const handleClickOptions = (type: string) => {
//     let component: LessonComponentProps;
//     switch (type) {
//       case ComponentType.Code:
//         component = {
//           type: 'Code',
//           content: {
//             allowDownload: false,
//             language: 'typescript',
//             code: '',
//             judgeContent: {
//               executeCode: '',
//               testCode: '',
//             },
//             runable: false,
//             timeLimit: 0,
//           },
//         };
//         break;
//       case ComponentType.Text:
//         component = {
//           type: 'Text',
//           content: {
//             html: '',
//           },
//         };
//         break;
//       default:
//         component = {
//           type: 'Text',
//           content: {
//             html: '',
//           },
//         };
//     }
//     setComponent({ component, index: params.index });
//     dispatch(setComponentType({ type, index: params.index! }));
//   };

//   const handleFocus = () => {
//     dispatch(setFocus({ index: params.index!, focus: true }));
//   };
//   const handleUnfocus = () => {
//     dispatch(setFocus({ index: params.index!, focus: false }));
//   };
//   return (
//     <div
//       ref={params.baseRef}
//       className={`flex cursor-text flex-col ${params.className}`}
//       draggable={!params.isReadOnly && draggable}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       onDragStart={params.onDragStart}
//       onDragEnd={params.onDragEnd}
//       onDragEnter={params.onDragEnter}
//       onFocus={handleFocus}
//       onBlur={handleUnfocus}
//     >
//       <div className="relative flex h-full w-full items-center">
//         <div
//           onMouseDown={() => setDraggable(false)}
//           onMouseUp={() => setDraggable(true)}
//           className="w-full"
//         >
//           {params.children}
//           {params.isLast && !params.isReadOnly && isHover && (
//             <div className="absolute -right-14 top-0 flex h-full gap-3 pl-10">
//               <CodeIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOptions('Code')} />
//             </div>
//           )}
//         </div>

//         {isHover && !params.isReadOnly && (
//           <div
//             onMouseDown={() => setDraggable(true)}
//             onMouseUp={() => setDraggable(false)}
//             className="absolute top-0 -left-10 h-full w-[28px] cursor-grab pr-10"
//           >
//             <div className="flex h-full w-[28px] items-center rounded-normal bg-[#f3f3f3]">
//               <Tooltip title="Hold to drag">
//                 <DragHandleIcon
//                   style={{
//                     fontSize: '28px',
//                     padding: '4px',
//                     color: '#d6d6d6',
//                     background: '#f3f3f3',
//                     borderRadius: '5px',
//                   }}
//                 />
//               </Tooltip>
//             </div>
//           </div>
//         )}
//       </div>
//       {params.isLast && <div onClick={handleAddComponent} className="h-8 w-full cursor-text"></div>}
//     </div>
//   );
// };

const BaseComponent = () => {
  return <div></div>;
};

export default BaseComponent;
