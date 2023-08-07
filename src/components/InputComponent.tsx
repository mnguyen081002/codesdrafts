import { useClickOutside } from '@mantine/hooks';
import isHotkey from 'is-hotkey';
import type { CSSProperties, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import slugify from 'slugify';

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
    child = <strong className="font-medium">{child}</strong>;
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

const NEW_COMPONENT = 'enter';
const BREAKLINE = 'enter';

const Element = ({ attributes, children, element }: any) => {
  const getText = (element: any) => {
    if (element.children?.length === 0 || !element.children) return '';
    if (element.children[0].text) {
      return slugify(element.children[0].text);
    }
    return getText(element.children);
  };

  const style: CSSProperties = { textAlign: element.align, lineHeight: '30px' };
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
        <h1 id={getText(element)} className="!mt-0 text-5xl leading-tight" {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 id={getText(element)} className="!mt-0 text-4xl" {...attributes}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 id={getText(element)} className="!mt-0 text-3xl" {...attributes}>
          {children}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 id={getText(element)} className="!mt-0 text-2xl" {...attributes}>
          {children}
        </h4>
      );
    case 'heading-five':
      return (
        <h5 className="!mt-0 text-xl" {...attributes}>
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
        <p className="!mt-0 font-lexend-deca text-lg font-light" style={style} {...attributes}>
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

    // shift enter to break line
    if (event.key === 'Enter' && event.shiftKey) {
      console.log('shift enter');

      event.preventDefault();
      editor.insertText('\n');
      return true;
    }

    if (isHotkey(NEW_COMPONENT, event as any)) {
      event.preventDefault();
      return false;
    }

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
    editor.children = CustomEditor.deserializeFromHtml(params.reference.current.content.html);

    setReload(!reload);
  }, []);
  const ref = useClickOutside(() => setIsFocus(false));
  return (
    <BaseComponentV2
      onClick={() => {
        setIsFocus(true);
      }}
      baseRef={ref}
      {...params}
    >
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
              <BlockButton format="heading-one" Icon={H1Icon} />
              <BlockButton format="heading-two" Icon={H2Icon} />
              <BlockButton format="heading-three" Icon={H3Icon} />
              <BlockButton format="heading-four" Icon={H4Icon} />
              <MarkButton format="bold" Icon={FormatBoldIcon} />
              <MarkButton format="italic" Icon={FormatItalicIcon} />
              <MarkButton format="underline" Icon={FormatUnderlinedIcon} />
              <MarkButton format="underline" Icon={StrikeThroughIcon} />
              <MarkButton format="underline" Icon={Subscript} />
              <MarkButton format="underline" Icon={Superscript} />
            </div>
            <div className="flex gap-2 border-r pr-4">
              <MarkButton format="code" Icon={CodeIcon} />
            </div>
            <div className="flex gap-2 border-r pr-4">
              <BlockButton format="left" Icon={FormatAlignLeftIcon} />
              <BlockButton format="center" Icon={FormatAlignCenterIcon} />
              <BlockButton format="right" Icon={FormatAlignRightIcon} />
            </div>
            <div className="flex gap-2">
              {/* <BlockButton format="block-quote" icon={<FormatQuoteIcon />} /> */}
              <BlockButton format="numbered-list" Icon={FormatListNumberedIcon} />
              <BlockButton format="bulleted-list" Icon={FormatListBulletedIcon} />
            </div>
          </Toolbar>
        ) : null}
        <Editable
          className="text-light-text-lessonContent"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus={!params.isReadOnly ? isFocus : false}
          spellCheck
          readOnly={params.isReadOnly}
          onFocus={() => {
            setPlaceholder('Nhập / để tạo widget');
            setHidden(true);
          }}
          onBlur={() => {
            setPlaceholder('');
            setHidden(false);
          }}
          onKeyDown={onKeyDown}
          onMouseEnter={() => !params.isReadOnly && setPlaceholder('Bắt đầu nhập')}
          onMouseLeave={() => !isFocus && setPlaceholder('')}
          placeholder={placeholder}
        />
      </Slate>
      {!params.isReadOnly && isFocus && (
        <div className="absolute right-[0.5rem] top-0 flex gap-3">{params.rightOptions}</div>
      )}
    </BaseComponentV2>
  );
};
