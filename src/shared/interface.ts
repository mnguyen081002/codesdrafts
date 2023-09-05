import type { BlogComponentType, LessonComponentType } from './enum/component';

export type IContent = ICodeContent | ITextContent;

export interface ICodeContent {
  code?: string;
  judgeContent: {
    testCode?: string;
    // executeCode?: string;
    answerCode?: string;
    sampleCode?: string;
    baseOn?: string;
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
  className?: string;
  isReadOnly?: boolean;
  baseRef?: any;
  reference: React.MutableRefObject<LessonComponentProps<T>>;
  onBlur?: any;
  setRefs?: any;
}

export interface IBaseBlogComponentProps<T> {
  onClick?: any;
  onEnter?: any;
  children?: any;
  className?: string;
  isFirst?: boolean;
  isReadOnly?: boolean;
  baseRef?: any;
  reference: React.MutableRefObject<BlogComponentProps<T>>;
  onBlur?: any;
  setRefs?: any;
}

export interface CodeComponentProps extends IBaseComponentProps {
  component: ICodeContent;
}

export interface LessonComponentProps<T = IContent> {
  type: LessonComponentType;
  content: T;
}

export interface PostCodeContent {
  code: string;
  language: string;
}
export interface BlogComponentProps<T> {
  type: BlogComponentType;
  content: T;
}

export interface InputTextComponentProps extends IBaseComponentProps {
  component: ITextComponent;
}

export interface InputTextComponentPropsV2 extends IBaseComponentPropsV2<ITextContent> {
  component: ITextComponent;
  rightOptions?: React.ReactNode;
}

export interface BlogInputTextComponentProps extends IBlogComponentProps<string> {
  rightOptions?: React.ReactNode;
  isFirst?: boolean;
  rerender: any;
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

export interface IBlogComponentProps<T> extends IBaseBlogComponentProps<T> {
  component?: BlogComponentProps<T>;
}

export interface ITextComponent extends IBaseComponentProps {
  content: ITextContent;
  type: LessonComponentType;
  isFocus?: boolean;
}

export interface ICodeComponent extends IBaseComponentProps {
  content: ICodeContent;
  type: LessonComponentType;
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
