// import { MoreVert } from '@mui/icons-material';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Menu,
//   MenuItem,
//   TextField,
// } from '@mui/material';
// import type { FC } from 'react';
// import React, { useState } from 'react';

// import type { CategoryResponse } from '../../api/codesmooth-api';
// import { CodeSmoothApi } from '../../api/codesmooth-api';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import Button from '../../common/Button';
// import { setSnackBar } from '../../features/auth/appSlice';
// import {
//   deleteCategoryById,
//   incrementActionCount,
//   selectCourse,
//   setCategoryTitle,
// } from '../../features/auth/LessonNavSlice';
// import { CourseCategoryType } from '../../shared/enum/category';
// import { generateLesson } from '../../utils/gen';
// import { generateId } from '../../utils/genId';

// interface CategoryMoreOptionsProps {
//   editMode?: boolean;
//   isHoverParent?: boolean;
//   category: CategoryResponse;
//   index: number;
// }

// const CategoryMoreOptions: FC<CategoryMoreOptionsProps> = (props) => {
//   const [openDialogInputTitle, setOpenDialogInputTitle] = useState(false);
//   const [openDialogInputNewCategory, setOpenDialogInputNewCategory] = useState(false);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   React.useState<null | HTMLElement>(null);
//   const [inputTitle, setInputTitle] = useState(props.category.title);
//   const [inputNewCate, setInputNewCate] = useState('');
//   const course = useAppSelector<CourseResponse>(selectCourse);
//   const openMore = Boolean(anchorEl);

//   const dispatch = useAppDispatch();

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleClickOpenDialogInputTitle = () => {
//     setOpenDialogInputTitle(true);
//     setAnchorEl(null);
//   };

//   const handleClickOpenDialogInputNewCategory = () => {
//     setOpenDialogInputNewCategory(true);
//     setAnchorEl(null);
//   };

//   const handleCloseDialogInputTitle = () => {
//     setOpenDialogInputTitle(false);
//   };

//   const handleCloseDialogNewCategory = () => {
//     setOpenDialogInputNewCategory(false);
//   };

//   const handleSaveTitle = async () => {
//     try {
//       await CodeSmoothApi.updateCategory(inputTitle, props.category.id);
//       dispatch(setCategoryTitle({ id: props.category.id, title: inputTitle }));
//     } catch (error) {
//       console.log(error);
//     }
//     setOpenDialogInputTitle(false);
//     setAnchorEl(null);
//   };

//   const handleDelete = async () => {
//     try {
//       if (course.category.length === 1) {
//         dispatch(setSnackBar({ message: 'Can not delete last category', type: 'error' }));
//         return;
//       }
//       await CodeSmoothApi.deleteCategoryById(props.category.id);
//       dispatch(deleteCategoryById(props.category.id));
//       dispatch(setSnackBar({ message: 'Delete category success', type: 'success' }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAnchorEl(null);
//     }
//   };

//   const handleAddCategory = async () => {
//     try {
//       const catid = generateId(18);

//       await CodeSmoothApi.createCategory(
//         inputNewCate,
//         catid,
//         course.id,
//         CourseCategoryType.SECTION,
//         props.index + 1,
//       );
//       // dispatch(
//       //   addCategory({ title: inputNewCate, id: catid, currentCategoryId: props.category.id }),
//       // );
//       dispatch(incrementActionCount());
//       dispatch(setSnackBar({ message: 'Create category success', type: 'success' }));
//       setAnchorEl(null);
//     } catch (error: any) {
//       dispatch(setSnackBar({ message: 'Create category failed', type: 'error' }));
//     }
//     setAnchorEl(null);
//     setOpenDialogInputNewCategory(false);
//   };

//   const handleAddLesson = async () => {
//     try {
//       const newLesson = generateLesson(props.category.id);
//       await CodeSmoothApi.addLesson({ ...newLesson, order: 0 });
//       // dispatch(
//       //   addLesson({
//       //     category_id: props.category.id,
//       //     id: newLesson.id,
//       //     title: newLesson.title,
//       //     index: 1,
//       //   }),
//       // );

//       dispatch(setSnackBar({ message: 'Create category success', type: 'success' }));
//       setAnchorEl(null);
//     } catch (error: any) {
//       console.log(error);
//     }
//     setAnchorEl(null);
//     setOpenDialogInputNewCategory(false);
//   };

//   return (props.editMode && props.isHoverParent) || openMore || openDialogInputTitle ? (
//     <>
//       <button
//         className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
//         onClick={handleClick}
//       >
//         <MoreVert
//           style={{
//             fontSize: '20px',
//           }}
//         />
//       </button>
//       <Menu
//         id="basic-menu"
//         open={openMore}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleClickOpenDialogInputNewCategory}>Add Category</MenuItem>
//         <MenuItem onClick={handleAddLesson}>Add Lesson</MenuItem>
//         <MenuItem onClick={handleClickOpenDialogInputTitle}>Rename</MenuItem>
//         <MenuItem onClick={handleDelete}>Delete</MenuItem>
//       </Menu>
//       <Dialog open={openDialogInputTitle} onClose={handleCloseDialogInputTitle}>
//         <DialogTitle
//           sx={{
//             width: '500px',
//           }}
//         >
//           Input title for category
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Category title"
//             fullWidth
//             variant="standard"
//             value={inputTitle}
//             onChange={(e) => {
//               setInputTitle(e.target.value);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button text="Cancel" onClick={handleCloseDialogInputTitle}></Button>
//           <Button
//             text="Save"
//             className=" bg-light-primary text-white"
//             onClick={handleSaveTitle}
//           ></Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={openDialogInputNewCategory} onClose={handleCloseDialogNewCategory}>
//         <DialogTitle
//           sx={{
//             width: '500px',
//           }}
//         >
//           Input title for category
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Category title"
//             fullWidth
//             variant="standard"
//             autoComplete="off"
//             value={inputNewCate}
//             onChange={(e) => {
//               setInputNewCate(e.target.value);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button text="Cancel" onClick={handleCloseDialogNewCategory}></Button>
//           <Button
//             text="Create"
//             className=" bg-light-primary text-white"
//             onClick={handleAddCategory}
//           ></Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   ) : (
//     <div className={`${!props.editMode ? 'h-3 w-3' : 'h-8 w-8'}`}></div>
//   );
// };

// export default CategoryMoreOptions;

const T = () => {
  return <div>T</div>;
};

export default T;
