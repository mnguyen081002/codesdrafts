export interface IContent {}

export interface ICodeContent extends IContent {
  code?: string;
  judgeContent: {
    testCode?: string;
    executeCode?: string;
  };
  language: string;
  runable: boolean;
  timeLimit: number;
  allowDownload: false;
  isTest?: boolean;
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
  index?: number;
  children?: any;
  isLast?: boolean;
  className?: string;
  isFocus?: boolean;
  isReadOnly?: boolean;
}
export interface CodeComponentProps extends IBaseComponentProps {
  component: ICodeContent;
}

export interface LessonComponentProps {
  type?: string;
  content: ICodeContent | ITextContent;
  isFocus?: boolean;
}

export interface InputTextComponentProps extends IBaseComponentProps {
  component: ITextComponent;
}

export interface ICodeComponentProps extends IBaseComponentProps {
  component: ICodeComponent;
}

export interface IComponentProps extends IBaseComponentProps {
  component: LessonComponentProps;
}

export interface ITextComponent extends IBaseComponentProps {
  content: ITextContent;
  type: string;
  isFocus?: boolean;
}

export interface ICodeComponent extends IBaseComponentProps {
  content: ICodeContent;
  type: string;
  isFocus?: boolean;
}

export interface ILesson {
  id: number;
  course_category_id: number;
  title: string;
  summary: string;
  components: LessonComponentProps[];
  isCompleted?: boolean;
}
