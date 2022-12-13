export interface IContent {}

export interface ICodeComponent {
  content: ICodeContent;
  type: string;
}

export interface ICodeContent extends IContent {
  code?: string;
  judgeContent: {
    testCode?: string ;
    executeCode?: string ;
  };
  language: string;
  runable: boolean;
  timeLimit: number;
  allowDownload: false;
}

export interface ITextContent {
  html: string;
}





export interface IBaseComponentProps {
  onClick?: any;
  onEnter?: any;
  onDragStart?: any;
  onDragEnter?: any;
  onDragEnd?: any;
  index: number;
  children?: any;
  isLast?: boolean;
  className?: string;
}



export interface CodeComponentProps extends IBaseComponentProps {
  component: ICodeContent;
}

export interface IComponentProps extends IBaseComponentProps {
  component: LessionComponentProps;
}
export interface LessionComponentProps {
  type?: string;
  content: ICodeContent | ITextContent;
  isFocus?: boolean;
}

export interface InputTextComponentProps extends IBaseComponentProps {
  component: ITextComponent;
}
export interface IComponentProps extends IBaseComponentProps {
  component: LessionComponentProps;
}

export interface ITextComponent extends IBaseComponentProps {
  content: ITextContent;
  type: string;
  isFocus?: boolean;
}