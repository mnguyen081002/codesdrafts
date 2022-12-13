import { FC } from "react";
import { ICodeContent, IComponentProps, ITextContent, ITextComponent } from "../shared/interface";
import { CodeComponent } from "./CodeComponent";
import { InputTextComponent } from "./InputComponent";

export const LessionComponent: FC<IComponentProps> = (params) => {
  
  switch (params.component.type) {
    case "Text":
      return (
        <InputTextComponent
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ITextComponent}
          index={params.index}
          isLast={params.isLast}
        />
      );
    case "Code":
      return (
        <CodeComponent
          isLast={params.isLast}
          component={params.component}
          index={params.index}
        />
      );
    default:
      return (
        <InputTextComponent
          onDragStart={params.onDragStart}
          onDragEnter={params.onDragEnter}
          onDragEnd={params.onDragEnd}
          component={params.component as ITextComponent}
          index={params.index}
          isLast={params.isLast}
        />
      );
  }
};