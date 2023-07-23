import { useSlate } from 'slate-react';

import CustomEditor from '../utils/CustomEditor';
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

export { BlockButton, MarkButton };
