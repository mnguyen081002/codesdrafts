import type { FC } from 'react';
import { useState } from 'react';

import DragIcon from '../common/Icons/DragIcon';
import type { IBaseComponentPropsV2 } from '../shared/interface';

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
//           className="h-fit w-full"
//         >
//           {params.children}
//           {/** TODO: It here */}
//           {!params.isReadOnly && (
//             <div className="absolute right-[0.5rem] top-[15px] flex gap-3">
//               <CodeIcon className="cursor-pointer" onClick={() => handleClickOptions('Code')} />
//             </div>
//           )}
//         </div>

//         {isHover && !params.isReadOnly && (
//           <div
//             onMouseDown={() => setDraggable(true)}
//             onMouseUp={() => setDraggable(false)}
//             className="absolute top-0 -left-10 h-full w-[28px] cursor-grab pr-10"
//           >
//             <div className="flex h-full w-[28px] items-center rounded-normal bg-[#F8F8F8]">
//               {/* <Tooltip title="Hold to drag"> */}
//               <DragIcon pathFill="#4C4E6454" />
//               {/* </Tooltip> */}
//             </div>
//           </div>
//         )}
//       </div>
//       {params.isLast && <div onClick={handleAddComponent} className="h-8 w-full cursor-text"></div>}
//     </div>
//   );
// };

export const BaseComponentV2: FC<IBaseComponentPropsV2> = (params) => {
  const [isHover, setIsHover] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      ref={params.baseRef}
      className={`flex flex-col `}
      draggable={!params.isReadOnly && draggable}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragStart={params.onDragStart}
      onDragEnd={params.onDragEnd}
      onDragEnter={params.onDragEnter}
      onClick={params.onClick}
      onBlur={params.onBlur}
    >
      <div className={`relative flex h-full w-full items-center `}>
        <div
          onMouseDown={() => setDraggable(false)}
          onMouseUp={() => setDraggable(true)}
          className={`w-full `}
        >
          {params.children}
          {/** TODO: It here */}
        </div>

        {isHover && !params.isReadOnly && (
          <div
            onMouseDown={() => setDraggable(true)}
            onMouseUp={() => setDraggable(false)}
            className="absolute top-0 -left-10 h-full w-[28px] cursor-grab pr-10"
          >
            <div className="flex h-full w-[28px] items-center rounded-normal bg-[#F8F8F8]">
              {/* <Tooltip title="Hold to drag"> */}
              <DragIcon pathFill="#4C4E6454" />
              {/* </Tooltip> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
