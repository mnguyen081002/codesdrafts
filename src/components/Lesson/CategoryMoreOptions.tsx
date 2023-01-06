import { MoreVert } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { CategoryResponse, CourseResponse } from '../../api/codesmooth-api';
import { CodeSmoothApi } from '../../api/codesmooth-api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../common/Button';
import { setSnackBar } from '../../features/auth/appSlice';
import {
  addCategory,
  deleteCategoryById,
  selectCourse,
  setCategoryTitle,
} from '../../features/auth/LessonNavSlice';
import { CourseCategoryType } from '../../shared/enum/category';
import { generateId } from '../../utils/genId';

interface CategoryMoreOptionsProps {
  editMode?: boolean;
  isHoverParent?: boolean;
  category: CategoryResponse;
}

const CategoryMoreOptions: FC<CategoryMoreOptionsProps> = (props) => {
  const [openDialogInputTitle, setOpenDialogInputTitle] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [inputTitle, setInputTitle] = useState(props.category.title);
  const course = useAppSelector<CourseResponse>(selectCourse);
  const openMore = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialogInputTitle = () => {
    setOpenDialogInputTitle(true);
    setAnchorEl(null);
  };

  const handleCloseDialogInputTitle = () => {
    setOpenDialogInputTitle(false);
  };

  const handleSaveTitle = async () => {
    try {
      await CodeSmoothApi.updateCategory(inputTitle, props.category.id);
      dispatch(setCategoryTitle({ id: props.category.id, title: inputTitle }));
    } catch (error) {
      console.log(error);
    }
    setOpenDialogInputTitle(false);
  };

  const handleDelete = async () => {
    try {
      await CodeSmoothApi.deleteCategoryById(props.category.id);
      dispatch(deleteCategoryById(props.category.id));
    } catch (error) {
      console.log(error);
    }
    setAnchorEl(null);
  };

  const handleAddCategory = async () => {
    try {
      await CodeSmoothApi.createCategory(
        inputTitle,
        generateId(18),
        course.id,
        CourseCategoryType.SECTION,
      );
      dispatch(addCategory({ title: inputTitle, id: generateId(18) }));
      dispatch(setSnackBar({ message: 'Thêm danh mục thành công', type: 'success' }));
      setAnchorEl(null);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (props.editMode && props.isHoverParent) || openMore || openDialogInputTitle ? (
    <>
      <button
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
        onClick={handleClick}
      >
        <MoreVert
          style={{
            fontSize: '20px',
          }}
        />
      </button>
      <Menu
        id="basic-menu"
        open={openMore}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickOpenDialogInputTitle}>Đổi tên</MenuItem>
        <MenuItem onClick={handleDelete}>Xóa</MenuItem>
        <MenuItem onClick={handleAddCategory}>Thêm danh mục</MenuItem>
      </Menu>
      <Dialog open={openDialogInputTitle} onClose={handleCloseDialogInputTitle}>
        <DialogTitle
          sx={{
            width: '500px',
          }}
        >
          Input title for category
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category title"
            fullWidth
            variant="standard"
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button text="Cancel" onClick={handleCloseDialogInputTitle}></Button>
          <Button
            text="Save"
            className="bg-light-secondary text-white"
            onClick={handleSaveTitle}
          ></Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <div className={`${!props.editMode ? 'h-3 w-3' : 'h-8 w-8'}`}></div>
  );
};

export default CategoryMoreOptions;
