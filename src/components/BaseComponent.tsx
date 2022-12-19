import { Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { IBaseComponentProps, LessionComponentProps } from "../shared/interface";
import CodeIcon from "@mui/icons-material/Code";
import { ComponentType } from "../shared/enum/component";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useAppDispatch } from "../app/hooks";
import {
  addComponent,
  setComponent,
  setComponents,
  setComponentType,
  setFocus,
} from "../features/auth/LessonSlice";

export const BaseComponent: FC<IBaseComponentProps> = (params) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddComponent = () => {
    dispatch(addComponent({ type: "Text", content: { html: "" } }));
  };

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };
  const handleClickOptions = (type: string) => {
    let component: LessionComponentProps;
    switch (type) {
      case ComponentType.Code:
        component = {
          type: "Code",
          content: {
            allowDownload: false,
            language: "typescript",
            code: "",
            judgeContent: {
              executeCode: "",
              testCode: "",
            },
            runable: false,
            timeLimit: 0,
          },
        };
        break;
      case ComponentType.Text:
        component = {
          type: "Text",
          content: {
            html: "",
          },
        };
        break;
      default:
        component = {
          type: "Text",
          content: {
            html: "",
          },
        };
    }
    setComponent({ component, index: params.index });
    dispatch(setComponentType({ type, index: params.index! }));
  };

  const handleFocus = () => {
    dispatch(setFocus(params.index!));
  };
  return (
    <div
      className={`cursor-text flex flex-col ${params.className}`}
      draggable
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragStart={params.onDragStart}
      onDragEnd={params.onDragEnd}
      onDragEnter={params.onDragEnter}
      onFocus={handleFocus}
    >
      <div className="h-full w-full relative flex items-center">
        <div className="w-full">
          {params.children}
          {params.isLast && isHover && (
            <div className="pl-10 absolute h-full -right-14 top-0 flex gap-3">
              <CodeIcon style={{ cursor: "pointer" }} onClick={() => handleClickOptions("Code")} />
            </div>
          )}
        </div>
        {isHover && (
          <div className="absolute w-[28px] pr-10 h-full top-0 -left-10 cursor-grab">
            <div className="bg-[#f3f3f3] rounded-normal h-full w-[28px] flex items-center">
              <Tooltip title="Hold to drag">
                <DragHandleIcon
                  style={{
                    fontSize: "28px",
                    padding: "4px",
                    color: "#d6d6d6",
                    background: "#f3f3f3",
                    borderRadius: "5px",
                  }}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      {params.isLast && <div onClick={handleAddComponent} className="h-8 w-full cursor-text"></div>}
    </div>
  );
};
