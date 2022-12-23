import { useSlate } from 'slate-react';

import CustomEditor from '../utils/CustomEditor';
import { ToolbarButton } from './SlateCommonComponents';

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

export { BlockButton, MarkButton };
