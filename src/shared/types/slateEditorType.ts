import type { BaseEditor, Descendant } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: CustomText[];
};

export type CodeElement = {
  type: 'code';
  children: CustomText[];
};
// export type HeadingElement = {
//   type: 'heading-one';
//   align?: string;
//   children: CustomText[];
// };

export type ImageElement = {
  type: 'image';
  url: string;
  alt?: string;
  children: EmptyText[];
};
export type TitleElement = { type: 'title'; children: Descendant[] };
export type ListItemElement = { type: 'list-item'; align?: string; children: Descendant[] };
export type EmptyText = {
  text: string;
};
export type LinkElement = { type: 'link'; url: string; children: Descendant[] };
export type BlockQuoteElement = { type: 'block-quote'; align?: string; children: Descendant[] };
export type EmbedElement = {
  type: 'embed';
  url: string;
  children: Descendant[];
};
export type EditableCardElement = {
  type: 'editable-card';
  children: CustomText[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
};
export type CustomElement =
  | CodeElement
  | ParagraphElement
  // | HeadingElement
  | ImageElement
  | LinkElement
  | EditableCardElement
  | TitleElement
  | ListItemElement
  | EmbedElement;
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  underline?: boolean;
  code?: boolean;
  align?: 'left' | 'center' | 'right';
  link?: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
