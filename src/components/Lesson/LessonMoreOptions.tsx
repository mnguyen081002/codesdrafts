import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import type { FC } from 'react';
import React, { useState } from 'react';

interface LessonMoreOptionsProps {
  editMode?: boolean;
  isHoverParent?: boolean;
  lesson: { title: string; id: number };
  onDeleteLesson?: (lesson: number) => void;
}

const LessonMoreOptions: FC<LessonMoreOptionsProps> = (props) => {
  const [openDialogInputTitle, setOpenDialogInputTitle] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMore = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    props.onDeleteLesson?.(props.lesson.id);
    setAnchorEl(null);
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
        <MenuItem
          sx={{
            width: '80px',
          }}
          onClick={handleDelete}
        >
          Xóa
        </MenuItem>
      </Menu>
      {/* <Dialog open={openDialogInputTitle} onClose={handleCloseDialogInputTitle}>
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
      </Dialog> */}
    </>
  ) : (
    <div className={`${!props.editMode ? 'h-3 w-3' : 'h-8 w-8'}`}></div>
  );
};

export default LessonMoreOptions;
