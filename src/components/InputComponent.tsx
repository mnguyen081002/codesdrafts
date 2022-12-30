import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CodeIcon from '@mui/icons-material/Code';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import isHotkey from 'is-hotkey';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { useAppDispatch } from '../app/hooks';
import { Toolbar } from '../common/SlateCommonComponents';
import { BlockButton, MarkButton } from '../common/ToolBarButton';
import { addComponent, deleteComponentByIndex, setComponent } from '../features/auth/LessonSlice';
import type { InputTextComponentProps } from '../shared/interface';
import CustomEditor from '../utils/CustomEditor';
import { BaseComponent } from './BaseComponent';

const Leaf = ({ attributes, children, leaf }: any) => {
  let child = children;
  if (leaf.bold) {
    child = <strong>{child}</strong>;
  }

  if (leaf.code) {
    child = <code>{child}</code>;
  }

  if (leaf.italic) {
    child = <em>{child}</em>;
  }

  if (leaf.underline) {
    child = <u>{child}</u>;
  }

  return <span {...attributes}>{child}</span>;
};

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 className="text-4xl" {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h6 className="text-3xl" {...attributes}>
          {children}
        </h6>
      );
    case 'heading-three':
      return (
        <h6 className="text-2xl" {...attributes}>
          {children}
        </h6>
      );
    case 'heading-four':
      return (
        <h6 className="text-xl" {...attributes}>
          {children}
        </h6>
      );
    case 'heading-five':
      return (
        <h6 className="text-lg" {...attributes}>
          {children}
        </h6>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
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
  const [placeholder, setPlaceholder] = useState('');
  const [isHidden, setHidden] = useState<boolean>(false);
  const [isShowParagraph, setIsShowParagraph] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const [editor] = useState(withHistory(withReact(createEditor())));
  const [reload, setReload] = useState<boolean>(false);

  const handleEnter = () => {
    if (params.isLast) {
      dispatch(addComponent({ type: 'Text', content: { html: '' } }));
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Backspace' && params.component.content.html === '') {
      dispatch(deleteComponentByIndex(params.index!));
      return false;
    }
    if (event.key === 'Enter' && event.shiftKey) {
      return true;
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleEnter();
    }

    Object.keys(HOTKEYS).forEach((hotkey) => {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
        CustomEditor.toggleMark(editor, mark);
      }
    });
    return true;
  };

  // const [initialValue, setInitialValue] = useState<Descendant[]>([]);
  // useEffect(() => {
  //   setInitialValue(CustomEditor.deserializeFromHtml(params.component.content.html));
  //   console.log({ initialValue });
  //   if (params.index !== 0) {
  //     // Transforms.select(editor, { offset: 0, path: [0, 0] });
  //     // ReactEditor.focus(editor);
  //   }
  //   // Transforms.select(editor, Editor.end(editor, []));
  //   // ReactEditor.focus(editor);
  // }, []);

  const initialValue: Descendant[] = CustomEditor.deserializeFromHtml(
    params.component.content.html,
  );
  useEffect(() => {
    if (params.isFocus) {
      ReactEditor.focus(editor);
    }
    editor.children = CustomEditor.deserializeFromHtml(params.component.content.html);
    setReload(!reload);
  }, [params.component.content.html]);

  return (
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
        {isHidden ? (
          <Toolbar>
            <div
              onClick={() => {
                setIsShowParagraph(!isShowParagraph);
              }}
              onMouseDown={(event: any) => {
                event.preventDefault();
              }}
              className="relative cursor-pointer gap-2 border-r pr-4"
            >
              <span className="h-full w-full">
                <span className="w-24">Paragraph</span>
                <ArrowDropDownIcon />
              </span>
              {isShowParagraph ? (
                <div className="absolute top-10 -left-2 flex w-full flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-forfun ">
                  <BlockButton format="heading-one" icon="Heading 1" />
                  <BlockButton format="heading-two" icon="Heading 2" />
                  <BlockButton format="heading-three" icon="Heading 3" />
                  <BlockButton format="heading-four" icon="Heading 4" />
                  <BlockButton format="heading-five" icon="Heading 5" />
                </div>
              ) : null}
            </div>
            <div className="flex gap-2 border-r pr-4">
              <MarkButton format="bold" icon={<FormatBoldIcon />} />
              <MarkButton format="italic" icon={<FormatItalicIcon />} />
              <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
              <MarkButton format="code" icon={<CodeIcon />} />
            </div>
            <div className="flex gap-2 border-r pr-4">
              <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
              <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
              <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
            </div>
            <div className="flex gap-2">
              <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
              <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
              <BlockButton format="right" icon={<FormatAlignRightIcon />} />
            </div>
          </Toolbar>
        ) : null}
        <Editable
          className="mt-4"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus={params.isFocus}
          spellCheck
          onFocus={() => {
            setPlaceholder('Type for widget');
            setHidden(true);
          }}
          onBlur={() => {
            setPlaceholder('');
            setHidden(false);
          }}
          onMouseEnter={() => !params.isFocus && setPlaceholder('Start typing')}
          onMouseLeave={() => !params.isFocus && setPlaceholder('')}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </BaseComponent>
  );
};
