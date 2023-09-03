/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { PropsWithChildren, Ref } from 'react';
import React from 'react';
import { useFocused, useSelected, useSlate, useSlateStatic } from 'slate-react';

import CustomEditor from '../utils/CustomEditor';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

const ButtonSTY = (active: boolean, reversed: boolean, disabled: boolean) => {
  return {
    color: reversed
      ? disabled
        ? 'rgba(241, 241, 241,25%)'
        : active
        ? '#black'
        : '#d8d8d8'
      : active
      ? 'black'
      : '#d8d8d8',
  };
};
export const ToolbarButton = React.forwardRef(
  (
    {
      disabled,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        disabled: boolean;
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <span
      {...props}
      ref={ref}
      className="cursor-pointer"
      style={ButtonSTY(active, reversed, disabled)}
    />
  ),
);
export const DeleButton = React.forwardRef(
  ({ ...props }: PropsWithChildren<{} & BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span {...props} ref={ref} className="absolute top-2  left-2  cursor-pointer text-red-600" />
  ),
);
export const AltButton = React.forwardRef(
  ({ ...props }: PropsWithChildren<{} & BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span {...props} ref={ref} className="absolute top-2  left-10  cursor-pointer text-blue-600" />
  ),
);

export const Icon = React.forwardRef(
  ({ ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span {...props} ref={ref} className="mx-1 align-text-bottom text-2xl" />
  ),
);
export const BlockIcon = React.forwardRef(
  ({ ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span {...props} ref={ref} className="m-1 align-text-bottom text-3xl" />
  ),
);
export const Toolbar = React.forwardRef(
  ({ ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => (
    <div
      {...props}
      ref={ref}
      className="absolute -top-10 z-10 flex gap-4 rounded-[5px] bg-white p-2 shadow-md"
    />
  ),
);

export const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const router = useRouter();

  return (
    <>
      <span className="relative text-light-primary" {...attributes} href={element.url}>
        {children}
        {selected && focused && (
          <div className="absolute -bottom-10 left-0 z-30 flex w-fit max-w-[800px] items-center gap-[25px] rounded-md border border-light-border bg-white py-1 px-2">
            <NextLink
              href={element.url}
              onClick={() => {
                router.push(element.url);
              }}
            >
              <div className="w-fit cursor-pointer text-light-primary">
                <p className="text-base" contentEditable={false}>
                  {element.url}
                </p>
              </div>
            </NextLink>
            <img
              className="h-[24px] w-[24px] cursor-pointer"
              src="/svg/link-off.svg"
              alt=""
              onClick={() => CustomEditor.removeLink(editor)}
            />
          </div>
        )}
      </span>
    </>
  );
};

// export const FormatButton = ({ format, icon }:any) => {
//   const editor = useSlate();
//   return (
//     <Button
//       reversed
//       active={CustomEditor.isFormatActive(editor, format)}
//       disabled={CustomEditor.isFormatDisabled(editor, format)}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         //disabled
//         if (CustomEditor.isFormatDisabled(editor, format)) return;
//         CustomEditor.toggleFormat(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };
export const BlockButton = ({ format, icon, title }: any) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      data-title={title}
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
      <BlockIcon>{icon}</BlockIcon>
    </ToolbarButton>
  );
};

// 上傳照片
// TODO: Open this
// export const UploadImageButton = () => {
//   const editor = useSlateStatic();
//   const uploaderRef = React.useRef(null);
//   const ImageUploader = () => {
//     const handleInputClick = (e) => {
//       e.stopPropagation();
//     };
//     const handleInputChange = (e) => {
//       const files = e.target.files;
//       console.log("files", files);

//       if (files.length > 0) {
//         const file = files[0];
//         const reader = new FileReader();

//         reader.readAsDataURL(file);
//         reader.onload = (e) => {
//           if (!e.target) return;
//           const url = e.target.result as string;
//           console.log("url", url);

//           const alt = null;
//           if (!url) return;
//           CustomEditor.insertImage(editor, url, alt);
//         };
//       }
//     };
//     return (
//       <input
//         ref={uploaderRef}
//         className="fixed z-30 left-10 top-5 hidden"
//         type="file"
//         accept="image/*"
//         onClick={handleInputClick}
//         onChange={handleInputChange}
//         multiple={false}
//       />
//     );
//   };
//   return (
//     <Button
//       data-title={"上傳相片"}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         if (uploaderRef.current) uploaderRef.current.click();
//       }}
//     >
//       <ImageUploader />
//       <BlockIcon>drive_folder_upload</BlockIcon>
//     </Button>
//   );
// };

export const AddLinkButton = () => {
  const editor = useSlate();
  return (
    <ToolbarButton
      reversed
      active={CustomEditor.isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('輸入超連結網址:');
        if (!url) {
          alert('請輸入正確超連結!');
          return;
        }
        CustomEditor.insertLink(editor, url);
      }}
    >
      <Icon>link</Icon>
    </ToolbarButton>
  );
};

export const RemoveLinkButton = () => {
  const editor = useSlate();
  return (
    <ToolbarButton
      reversed
      active={CustomEditor.isLinkActive(editor)}
      onMouseDown={() => {
        if (CustomEditor.isLinkActive(editor)) {
          CustomEditor.unwrapLink(editor);
        }
      }}
    >
      <Icon>link_off</Icon>
    </ToolbarButton>
  );
};

// 插入嵌入網站標籤
export const EmbedButton = () => {
  const editor = useSlateStatic();
  return (
    <ToolbarButton
      data-title={'嵌入連結'}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.embed(editor);
      }}
    >
      <BlockIcon>label_important_outline</BlockIcon>
    </ToolbarButton>
  );
};

export const InsertEditableCardButton = () => {
  const editor = useSlateStatic();
  return (
    <ToolbarButton
      data-title={'新增自訂區塊'}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.insertEditableCard(editor);
      }}
    >
      <BlockIcon>add</BlockIcon>
    </ToolbarButton>
  );
};
