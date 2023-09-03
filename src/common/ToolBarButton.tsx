/* eslint-disable no-restricted-syntax */
import isUrl from 'is-url';
import { toast } from 'react-toastify';
import { Editor, Element, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { TOAST_CONFIG } from '../shared/constants/app';
import type { ImageElement, LinkElement } from '../shared/types/slateEditorType';
import { isImageUrl } from '../utils/app';
import CustomEditor from '../utils/CustomEditor';
import InsertImage from './Icons/InsertImage';
import InsertLinkIcon from './Icons/InsertLinkIcon';
import { ToolbarButton } from './SlateCommonComponents';

const MarkButton = ({ format, Icon }: { format: string; Icon: any }) => {
  const editor = useSlate();
  const isActive = CustomEditor.isMarkActive(editor, format);
  return (
    <ToolbarButton
      active={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      <Icon pathFill={`${isActive ? '#1363DF' : 'black'}`} />
    </ToolbarButton>
  );
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image: ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor, url: string) => {
  if (CustomEditor.isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const AddLinkButton = () => {
  const editor = useSlate();

  return (
    <InsertLinkIcon
      pathFill={`${CustomEditor.isLinkActive(editor) ? '#1363DF' : 'black'}`}
      onClick={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    />
  );
};

// const RemoveLinkButton = () => {
//   const editor = useSlate();

//   return (
//     <Button
//       active={isLinkActive(editor)}
//       onMouseDown={(event) => {
//         if (isLinkActive(editor)) {
//           unwrapLink(editor);
//         }
//       }}
//     >
//       <Icon>link_off</Icon>
//     </Button>
//   );
// };

const withInlines = (editor) => {
  const { insertData, insertText, isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element) =>
    ['link', 'button', 'badge'].includes(element.type) || isInline(element);

  editor.isElementReadOnly = (element) => element.type === 'badge' || isElementReadOnly(element);

  editor.isSelectable = (element) => element.type !== 'badge' && isSelectable(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

function InsertImageButton(props) {
  return (
    <div className="relative h-[24px] w-[24px]">
      <input
        type="file"
        className="absolute inset-0 opacity-0"
        onChange={async (event) => {
          if (!event.target.files || event.target.files.length === 0) {
            return;
          }

          const file = event.target.files[0];
          if (!file) return;
          try {
            const objectUrl = URL.createObjectURL(file);
            insertImage(props.editor, objectUrl);
          } catch (error) {
            toast.error('Không thể tải ảnh lên', TOAST_CONFIG);
          }
        }}
      />
      <InsertImage className="" pathFill="black" />
    </div>
  );
}

const BlockButton = ({ format, Icon }: any) => {
  const editor = useSlate();
  const isActive = CustomEditor.isBlockActive(
    editor,
    format,
    CustomEditor.Text_Align_Types.includes(format) ? 'align' : 'type',
  );
  return (
    <ToolbarButton
      active={isActive}
      onMouseDown={(event: any) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      <Icon pathFill={`${isActive ? '#1363DF' : 'black'}`} />
    </ToolbarButton>
  );
};

export { AddLinkButton, BlockButton, InsertImageButton, MarkButton, withImages, withInlines };
