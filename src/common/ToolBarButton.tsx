import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react';
import { ReactEditor, useSlate } from 'slate-react';

import CustomEditor from '../utils/CustomEditor';
import { ToolbarButton } from './SlateCommonComponents';

interface ToolBarButtonProps {
  active: boolean;
  reversed?: boolean;
  icon?: string;
}

// const ToolBarButton = ({
//   className,
//   active,
//   reversed,
//   ...props
// }: PropsWithChildren<
//   ToolBarButtonProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
// >) => {
//   const { icon, onClick } = props;
//   return (
//     <div className="tool-bar-button" onClick={onClick}>
//       {icon}
//     </div>
//   );
// };
const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();

  return (
    <ToolbarButton
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {icon}
    </ToolbarButton>
  );
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={CustomEditor.isBlockActive(
        editor,
        format,
        CustomEditor.Text_Align_Types.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={(event: any) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      {icon}
    </ToolbarButton>
  );
};

// const LIST_TYPES = ["numbered-list", "bulleted-list"];
// const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// const toggleBlock = (editor:any, format:any) => {
//   const isActive = CustomEditor.isBlockActive(
//     editor,
//     format,
//     CustomEditor.Text_Align_Types.includes(format) ? "align" : "type",
//   );
//   const isList = CustomEditor.List_TYPES.includes(format);

//   Transforms.unwrapNodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) &&
//       SlateElement.isElement(n) &&
//       LIST_TYPES.includes(n.type) &&
//       !TEXT_ALIGN_TYPES.includes(format),
//     split: true,
//   });
//   let newProperties: Partial<SlateElement>;
//   if (TEXT_ALIGN_TYPES.includes(format)) {
//     newProperties = {
//       children: [],
//     };
//   } else {
//     newProperties = {
//       type: isActive ? "paragraph" : isList ? "list-item" : format,
//     };
//   }
//   Transforms.setNodes<SlateElement>(editor, newProperties);

//   if (!isActive && isList) {
//     const block = { type: format, children: [] };
//     Transforms.wrapNodes(editor, block);
//   }
// };

// const isBlockActive = (editor: BaseEditor & ReactEditor & HistoryEditor, format: any, blockType = "type") => {
//   const { selection } = editor;
//   if (!selection) return false;

//   const [match] = Array.from(
//     Editor.nodes(editor, {
//       at: Editor.unhangRange(editor, selection),
//       // ignore error

//       match: (n) => SlateElement.isElement(n) && n.type === format && n[blockType as keyof Node] === format,
//     }),
//   );

//   return !!match;
// };

// const isMarkActive = (editor: any, format: any) => {
//   const marks = Editor.marks(editor) as any;
//   return marks ? marks[format] === true : false;
// };

export { BlockButton, MarkButton };
