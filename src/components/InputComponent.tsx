import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import { FC, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createEditor, Descendant, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, useSlate, withReact, ReactEditor } from "slate-react";
import { useAppDispatch } from "../app/hooks";
import { BlockButton, MarkButton } from "../common/ToolBarButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { addComponent, deleteComponentByIndex, setComponent } from "../features/auth/LessonSlice";
import { InputTextComponentProps } from "../shared/interface";
import { BaseComponent } from "./BaseComponent";
import { Toolbar, ToolbarButton } from "../common/SlateCommonComponents";
import CustomEditor from "../utils/CustomEditor";
import isHotkey from "is-hotkey";

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

// const isMarkActive = (editor: any, format: any) => {
//   const marks = Editor.marks(editor) as any;
//   return marks ? marks[format] === true : false;
// };

// const toggleMark = (editor: any, format: string) => {
//   const isActive = isMarkActive(editor, format);

//   if (isActive) {
//     Editor.removeMark(editor, format);
//   } else {
//     Editor.addMark(editor, format, true);
//   }
// };

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export const InputTextComponent: FC<InputTextComponentProps> = (params) => {
  const [placeholder, setPlaceholder] = useState("");
  const dispatch = useAppDispatch();
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const [editor] = useState(withHistory(withReact(createEditor())));

  const handleEnter = () => {
    if (params.isLast) {
      dispatch(addComponent({ type: "Text", content: { html: "" } }));
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Backspace" && params.component.content.html === "") {
      dispatch(deleteComponentByIndex(params.index!));
      return false;
    }
    if (event.key === "Enter" && event.shiftKey) {
      return true;
    }
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleEnter();
    }

    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
        CustomEditor.toggleMark(editor, mark);
      }
    }
  };

  useEffect(() => {
    if (params.index !== 0) {
      // Transforms.select(editor, { offset: 0, path: [0, 0] });
      // ReactEditor.focus(editor);
    }
    // Transforms.select(editor, Editor.end(editor, []));
    // ReactEditor.focus(editor);
  }, []);



  const initialValue: Descendant[] = CustomEditor.deserializeFromHtml(params.component.content.html);
  console.log({ initialValue });
  return (
    <>
      <BaseComponent {...params}>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(v: any) => {
            dispatch(
              setComponent({
                component: {
                  ...params.component,
                  content: { html: CustomEditor.serialize({ children: v }) },
                },
                index: params.index,
              }),
            );
          }}
        >
          <Toolbar>
            <MarkButton format="bold" icon={<FormatBoldIcon />} />
            <MarkButton format="italic" icon={<FormatItalicIcon />} />
            <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
            <MarkButton format="code" icon={<CodeIcon />} />
            {/* <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" /> */}
            <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
            <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
            <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
            <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
            <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
            <BlockButton format="right" icon={<FormatAlignRightIcon />} />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus={params.isFocus}
            spellCheck
            onFocus={() => {
              setPlaceholder("Type for widget");
            }}
            onBlur={() => {
              setPlaceholder("");
            }}
            onMouseEnter={() => !params.isFocus && setPlaceholder("Start typing")}
            onMouseLeave={() => !params.isFocus && setPlaceholder("")}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
          />
        </Slate>
      </BaseComponent>
    </>
  );
};
