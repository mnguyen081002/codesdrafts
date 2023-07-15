import isHotkey from 'is-hotkey';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import CodeIcon from '../common/Icons/CodeIcon';
import FormatAlignCenterIcon from '../common/Icons/FormatAlignCenterIcon';
import FormatAlignLeftIcon from '../common/Icons/FormatAlignLeftIcon';
import FormatAlignRightIcon from '../common/Icons/FormatAlignRightIcon';
import FormatBoldIcon from '../common/Icons/FormatBoldIcon';
import FormatItalicIcon from '../common/Icons/FormatItalicIcon';
import FormatListBulletedIcon from '../common/Icons/FormatListBulletedIcon';
import FormatListNumberedIcon from '../common/Icons/FormatListNumberedIcon';
import FormatUnderlinedIcon from '../common/Icons/FormatUnderlinedIcon';
import H1Icon from '../common/Icons/H1Icon';
import H2Icon from '../common/Icons/H2Icon';
import H3Icon from '../common/Icons/H3Icon';
import H4Icon from '../common/Icons/H4Icon';
import StrikeThroughIcon from '../common/Icons/StrikeThroughIcon';
import Subscript from '../common/Icons/Subscript';
import Superscript from '../common/Icons/Superscript';
import { Toolbar } from '../common/SlateCommonComponents';
import { BlockButton, MarkButton } from '../common/ToolBarButton';
import type { InputTextComponentPropsV2 } from '../shared/interface';
import CustomEditor from '../utils/CustomEditor';
import { BaseComponentV2 } from './BaseComponent';

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
    case 'heading-two':
      return (
        <h2 className="text-4xl font-semibold" {...attributes}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 className="text-3xl font-semibold" {...attributes}>
          {children}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 className="text-2xl font-semibold" {...attributes}>
          {children}
        </h4>
      );
    case 'heading-five':
      return (
        <h5 className="text-xl font-semibold" {...attributes}>
          {children}
        </h5>
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
        <p className="text-lg" style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export const InputTextComponentV2: FC<InputTextComponentPropsV2> = (params) => {
  const [placeholder, setPlaceholder] = useState('');
  const [isHidden, setHidden] = useState<boolean>(false);
  const [isShowParagraph, setIsShowParagraph] = useState<boolean>(false);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const [editor] = useState(withHistory(withReact(createEditor())));
  const [reload, setReload] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onKeyDown = (event) => {
    const regex = /(<([^>]+)>)/gi;
    const body = params.reference.current.content.html;
    const hasText = !!body?.replace(regex, '').length;

    if (event.key === 'Backspace' && !hasText) {
      console.log('Backspace');
      if (!hasText) {
        params.setRefs((prev) => [...prev.filter((item) => item !== params.reference)]);
      }
      return false;
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

  const initialValue: Descendant[] = CustomEditor.deserializeFromHtml(
    params.reference.current.content.html,
  );
  useEffect(() => {
    // if (isFocus) {
    //   ReactEditor.focus(editor);
    // }
    editor.children = CustomEditor.deserializeFromHtml(params.reference.current.content.html);

    setReload(!reload);
  }, []);

  return (
    <BaseComponentV2 {...params}>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(v: any) => {
          params.reference.current.content.html = CustomEditor.serialize({ children: v });
        }}
      >
        {isHidden && !params.isReadOnly ? (
          <Toolbar>
            <div
              onClick={() => {
                setIsShowParagraph(!isShowParagraph);
              }}
              onMouseDown={(event: any) => {
                event.preventDefault();
              }}
              className="relative flex cursor-pointer gap-2 border-r pr-4"
            >
              <BlockButton format="heading-one" icon={<H1Icon />} />
              <BlockButton format="heading-two" icon={<H2Icon />} />
              <BlockButton format="heading-three" icon={<H3Icon />} />
              <BlockButton format="heading-four" icon={<H4Icon />} />
              <MarkButton format="bold" icon={<FormatBoldIcon />} />
              <MarkButton format="italic" icon={<FormatItalicIcon />} />
              <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
              <MarkButton format="underline" icon={<StrikeThroughIcon />} />
              <MarkButton format="underline" icon={<Subscript />} />
              <MarkButton format="underline" icon={<Superscript />} />
            </div>
            <div className="flex gap-2 border-r pr-4">
              <MarkButton format="code" icon={<CodeIcon />} />
            </div>
            <div className="flex gap-2 border-r pr-4">
              <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
              <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
              <BlockButton format="right" icon={<FormatAlignRightIcon />} />
            </div>
            <div className="flex gap-2">
              {/* <BlockButton format="block-quote" icon={<FormatQuoteIcon />} /> */}
              <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
              <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
            </div>
          </Toolbar>
        ) : null}
        <Editable
          className="items-center"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus={!params.isReadOnly ? isFocus : false}
          spellCheck
          readOnly={params.isReadOnly}
          onFocus={() => {
            setPlaceholder('Type for widget');
            setHidden(true);
          }}
          onBlur={() => {
            setPlaceholder('');
            setHidden(false);
          }}
          onKeyDown={onKeyDown}
          onMouseEnter={() => !params.isReadOnly && setPlaceholder('Start typing')}
          onMouseLeave={() => !isFocus && setPlaceholder('')}
          placeholder={placeholder}
        />
      </Slate>
      {!params.isReadOnly && isFocus && (
        <div className="absolute right-[0.5rem] top-[15px] flex gap-3">{params.rightOptions}</div>
      )}
    </BaseComponentV2>
  );
};
