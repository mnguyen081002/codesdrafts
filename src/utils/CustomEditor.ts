// inlines ,blocks 設定
import escapeHtml from 'escape-html';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import type { BaseEditor, Descendant } from 'slate';
import { Editor, Element, Range, Text, Transforms } from 'slate';
import type { HistoryEditor } from 'slate-history';
import { jsx } from 'slate-hyperscript';
import type { ReactEditor } from 'slate-react';

import type {
  CustomText,
  EditableCardElement,
  EmbedElement,
  ImageElement,
  LinkElement,
  ParagraphElement,
} from '../shared/types/slateEditorType';

const CustomEditor = {
  isMarkActive(editor: any, format: any) {
    const marks = Editor.marks(editor) as any;
    return marks ? marks[format] === true : false;
  },

  toggleMark(editor: any, format: string) {
    const isActive = CustomEditor.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  isBlockActive(editor: BaseEditor & ReactEditor & HistoryEditor, format: any, blockType = 'type') {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        // ignore error

        // match: (n) =>
        //   Element.isElement(n) && n.type === format && n[blockType as keyof typeof n] === format,
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n[blockType] === format,
      }),
    );
    return !!match;
  },
  // isFormatActive(editor: BaseEditor & ReactEditor & HistoryEditor, format: any) {
  //   const [match] = Editor.nodes(editor, {
  //     match: (n) => n[format] === true,
  //     mode: "all",
  //   });
  //   return !!match;
  // },
  // isFormatDisabled(editor: BaseEditor & ReactEditor & HistoryEditor, format: undefined) {
  //   const [disabled] = Array.from(
  //     Editor.nodes(editor, {
  //       match: (n) => {
  //         if (Element.isElement(n)) {
  //           const isHead = CustomEditor.Head_TYPES.includes(n.type);
  //           const isList = CustomEditor.List_TYPES.includes(n.type);
  //           if (isHead) {
  //             return true;
  //           }
  //           if (isList) {
  //             switch (format) {
  //               case "code":
  //                 return true;
  //               case "strikethrough":
  //                 return true;
  //               default:
  //                 return false;
  //             }
  //           }
  //           return false;
  //         }
  //       },
  //     }),
  //   );
  //   return disabled;
  // },
  Head_TYPES: [
    'title',
    'heading-two',
    'heading-three',
    'heading-four',
    'heading-five',
    'block-quote',
  ],
  List_TYPES: ['numbered-list', 'bulleted-list'],
  Text_Align_Types: ['left', 'center', 'right', 'justify'],

  // 文字樣式
  // toggleFormat(editor: BaseEditor & ReactEditor & HistoryEditor, format: any) {
  //   const isActive = CustomEditor.isFormatActive(editor, format);
  //   Transforms.setNodes(
  //     editor,
  //     { [format]: isActive ? null : true },
  //     { match: Text.isText, split: true },
  //   );
  // },
  // block區塊樣式
  toggleBlock(editor: BaseEditor & ReactEditor & HistoryEditor, format: any) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      CustomEditor.Text_Align_Types.includes(format) ? 'align' : 'type',
    );
    const isList = CustomEditor.List_TYPES.includes(format);
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        CustomEditor.List_TYPES.includes(n.type) &&
        !CustomEditor.Text_Align_Types.includes(format),
      split: true,
    });
    let newProperties: Partial<Element>;
    if (CustomEditor.Text_Align_Types.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
    }
    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
  // Link
  isLinkActive(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const [link] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
    return !!link;
  },
  unwrapLink(editor: BaseEditor & ReactEditor & HistoryEditor) {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
  },
  wrapLink(editor: BaseEditor & ReactEditor & HistoryEditor, url: string) {
    if (CustomEditor.isLinkActive(editor)) {
      CustomEditor.unwrapLink(editor);
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
  },
  insertLink(editor: BaseEditor & ReactEditor & HistoryEditor, url: string) {
    if (editor.selection) {
      CustomEditor.wrapLink(editor, url);
    }
  },

  // image
  insertImage(editor: BaseEditor & ReactEditor & HistoryEditor, url: any, alt: any) {
    const text = { text: '' };
    const image: ImageElement = { type: 'image', url, alt, children: [text] };

    const paragraph: ParagraphElement = {
      type: 'paragraph',
      children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, image);
    Transforms.insertNodes(editor, paragraph);
  },
  setAlt(editor: any, url: any, alt: any, path: any) {
    const text = { text: '' };
    const image: ImageElement = { type: 'image', url, alt, children: [text] };
    Transforms.setNodes(editor, image, { at: path });
  },
  isImageUrl(url: string) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop()!;
    return imageExtensions.includes(ext);
  },

  embed(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const text = { text: '' };
    const embedNode: EmbedElement = {
      type: 'embed',
      url: '',
      children: [text],
    };
    const paragraph: ParagraphElement = {
      type: 'paragraph',
      children: [{ text: '' }],
    };
    // Transforms.insertNodes(editor, videoNode);
    Transforms.wrapNodes(editor, embedNode, { split: true });
    Transforms.insertNodes(editor, paragraph);
  },

  insertEditableCard(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const voidNode: EditableCardElement = {
      type: 'editable-card',
      children: [{ text: '' }],
    };
    const paragraph: ParagraphElement = {
      type: 'paragraph',
      children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, voidNode);
    Transforms.insertNodes(editor, paragraph);
  },

  deserializeFromHtml(html): Descendant[] {
    if (html === '') {
      return [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ];
    }
    const document = new window.DOMParser().parseFromString(html, 'text/html');
    return this.deserialize(document.body);
  },

  serialize(node: any): string {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      const n: CustomText = node;
      if (n.code) {
        return `<pre><code>${string}</code></pre>`;
      }
      if (n.italic) {
        string = `<em>${string}</em>`;
      }

      if (n.bold) {
        string = `<strong>${string}</strong>`;
      }

      if (n.underline) {
        string = `<u>${string}</u>`;
      }
      return `${string}`;
    }

    const children = node.children.map((n) => this.serialize(n)).join('');
    switch (node.align) {
      case 'left':
        return `<div style="text-align: left">${children}</div>`;
      case 'center':
        return `<div style="text-align: center">${children}</div>`;
      case 'right':
        return `<div style="text-align: right">${children}</div>`;
      default:
        break;
    }
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`;
      case 'paragraph':
        return `<p>${children}</p>`;
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      case 'code':
      case 'bulleted-list':
        return `<ul>${children}</ul>`;
      case 'heading-one':
        return `<h1>${children}</h1>`;
      case 'heading-two':
        return `<h2>${children}</h2>`;
      case 'heading-three':
        return `<h3>${children}</h3>`;
      case 'heading-four':
        return `<h4>${children}</h4>`;
      case 'heading-five':
        return `<h5>${children}</h5>`;
      case 'list-item':
        return `<li>${children}</li>`;
      case 'numbered-list':
        return `<ol>${children}</ol>`;
      default:
        return children;
    }
  },

  deserialize(el, markAttributes: any = {}) {
    if (el.nodeType === Node.TEXT_NODE) {
      return jsx('text', markAttributes, el.textContent);
    }
    if (el.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
      case 'STRONG':
        nodeAttributes.bold = true;
        break;
      case 'EM':
        nodeAttributes.italic = true;
        break;
      case 'U':
        nodeAttributes.underline = true;
        break;
      case 'CODE':
        nodeAttributes.code = true;
        break;
      case 'DIV':
        nodeAttributes.align = el.style.textAlign;
        break;
      default:
        break;
    }

    const children = Array.from(el.childNodes)
      .map((node) => this.deserialize(node, nodeAttributes))
      .flat();

    if (children.length === 0) {
      children.push(jsx('text', nodeAttributes, ''));
    }
    switch (el.nodeName) {
      case 'DIV':
        return jsx('fragment', {}, children);
      case 'BODY':
        return jsx('fragment', {}, children);
      case 'BR':
        return '\n';
      case 'BLOCKQUOTE':
        return jsx('element', { type: 'quote' }, children);
      case 'P':
        return jsx('element', { type: 'paragraph', ...nodeAttributes }, children);
      case 'A':
        return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
      case 'PRE':
        return jsx('element', { type: 'code' }, children);
      case 'UL':
        return jsx('element', { type: 'bulleted-list' }, children);
      case 'OL':
        return jsx('element', { type: 'numbered-list' }, children);
      case 'LI':
        return jsx('element', { type: 'list-item' }, children);
      case 'H1':
        return jsx('element', { type: 'heading-one' }, children);
      case 'H2':
        return jsx('element', { type: 'heading-two' }, children);
      case 'H3':
        return jsx('element', { type: 'heading-three' }, children);
      case 'H4':
        return jsx('element', { type: 'heading-four' }, children);
      case 'H5':
        return jsx('element', { type: 'heading-five' }, children);
      default:
        return children;
    }
  },
};

export default CustomEditor;
