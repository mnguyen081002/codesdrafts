import { FC, KeyboardEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAppDispatch } from "../app/hooks";
import {
  addComponent,
  deleteComponentByIndex,
  setComponent,
  setTextContent,
} from "../features/auth/componentsSlice";
import {  InputTextComponentProps, ITextComponent } from "../shared/interface";
import { BaseComponent } from "./BaseComponent";

export const InputTextComponent: FC<InputTextComponentProps> = (params) => {
  const [placeholder, setPlaceholder] = useState("");
  const [isFocus, setIsFocus] = useState(params.index !== 0);
  const dispatch = useAppDispatch();

  const _handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" && params.component.content.html === "") {
      dispatch(deleteComponentByIndex(params.index));
      return false;
    }
    if (event.key === "Enter" && event.shiftKey) {
      return true;
    }
    if (event.key == "Enter" && !event.shiftKey) {
      setIsFocus(false);
      handleEnter();
      return false;
    }
    return false;
  };

  const onChange = (e: any) => {
    if (e.target.value === "") {
      return;
    }
    if (e.target.value === "\n") {
      return;
    }
    const newObject:ITextComponent = {
      content: {
        html: e.target.value,
      },
      type: "Text",
      index: params.index,
    };

    dispatch(setComponent({ component:newObject, index: params.index }));
  };

  const handleEnter = () => {
    if (params.isLast) {
      dispatch(addComponent({ type: "Text", content: { html: "" } }));
    }
  };

  return (
    <>
      <BaseComponent {...params}>
        <ReactTextareaAutosize
          onFocus={() => {
            setPlaceholder("Type for widget"), setIsFocus(true);
          }}
          onBlur={() => {
            setPlaceholder(""), setIsFocus(false);
          }}
          autoFocus={isFocus}
          onMouseEnter={() => !isFocus && setPlaceholder("Start typing")}
          onMouseLeave={() => !isFocus && setPlaceholder("")}
          placeholder={placeholder}
          className="outline-none px-2 w-full resize-none"
          onKeyDown={_handleKeyDown}
          value={params.component.content.html}
          onChange={onChange}
        />
      </BaseComponent>
    </>
  );
};
