import type { ComponentType } from './enum/component';

export type IContent = ICodeContent | ITextContent;

export interface ICodeContent {
  code?: string;
  judgeContent: {
    testCode?: string;
    executeCode?: string;
    answerCode?: string;
    sampleCode?: string;
  };
  isReadOnly: boolean;
  language: string;
  runable: boolean;
  timeLimit: number;
  allowDownload: false;
  isExercise: boolean;
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
  baseRef?: any;
}

export interface IBaseComponentPropsV2<T = IContent> {
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
  baseRef?: any;
  reference: React.MutableRefObject<LessonComponentProps<T>>;
  onBlur?: any;
}
export interface CodeComponentProps extends IBaseComponentProps {
  component: ICodeContent;
}

export interface LessonComponentProps<T = IContent> {
  type: ComponentType;
  content: T;
  isFocus?: boolean;
  focusIndex?: number;
}

export interface InputTextComponentProps extends IBaseComponentProps {
  component: ITextComponent;
}

export interface InputTextComponentPropsV2 extends IBaseComponentPropsV2<ITextContent> {
  component: ITextComponent;
  rightOptions: React.ReactNode;
}

export interface ICodeComponentProps extends IBaseComponentProps {
  component: ICodeComponent;
}

export interface ICodeComponentPropsV2 extends IBaseComponentPropsV2<ICodeContent> {
  component: ICodeComponent;
}

export interface IComponentProps extends IBaseComponentProps {
  component: LessonComponentProps;
}

export interface IComponentPropsV2 extends IBaseComponentPropsV2 {
  component?: LessonComponentProps;
}

export interface ITextComponent extends IBaseComponentProps {
  content: ITextContent;
  type: ComponentType;
  isFocus?: boolean;
}

export interface ICodeComponent extends IBaseComponentProps {
  content: ICodeContent;
  type: ComponentType;
  isFocus?: boolean;
}

export interface ILesson {
  id: number;
  course_category_id: number;
  title: string;
  summary: string;
  order: number;
  components: LessonComponentProps[];
  isCompleted?: boolean;
}
