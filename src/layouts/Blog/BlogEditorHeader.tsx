import Link from 'next/link';
import type { NextRouter } from 'next/router';
import { toast } from 'react-toastify';

import { PrimaryButton, PrimaryOutlineButton } from '../../components/Button';
import { TOAST_CONFIG } from '../../shared/constants/app';
import Header from '../NewHeader';

interface PostEditorHeaderProps {
  router: NextRouter;
  onSubmit: (data: any) => void;
  handleSubmit: (onSubmit: (data: any) => void) => () => void;
}

function PostEditorHeader(props: PostEditorHeaderProps) {
  return (
    <Header
      isHiddenNavbar
      right={
        <div className="flex items-center">
          <Link
            href={`/blog/${props.router.query.slug}`}
            onClick={() => {
              if (props.router.query.slug) {
                props.router.push(`/blog/${props.router.query.slug}`);
              } else {
                toast.error('Vui lòng tạo khóa học trước khi xem trước', TOAST_CONFIG);
              }
            }}
          >
            <PrimaryOutlineButton
              className="border-none px-0 hover:bg-white"
              textHoverClassName="text-[#013F9E]"
              text="Xem trước"
              onClick={() => {
                if (props.router.query.slug) {
                  props.router.push(`/blog/${props.router.query.slug}`);
                } else {
                  toast.error('Vui lòng tạo khóa học trước khi xem trước', TOAST_CONFIG);
                }
              }}
            />
          </Link>

          {props.router.query.slug ? (
            <>
              <PrimaryOutlineButton
                textHoverClassName="text-[#013F9E] px-0"
                className="border-none hover:bg-white"
                text="Hủy bỏ"
                onClick={() => {
                  props.router.back();
                }}
              />
              <PrimaryOutlineButton
                bgHoverColor="hover:bg-light-primary"
                className="w-fit px-[30px] py-[9px]"
                textHoverClassName="text-[#ffffff]"
                text="Cập nhật"
                type="submit"
                onClick={props.handleSubmit(props.onSubmit)}
              />
            </>
          ) : (
            <PrimaryButton
              className="ml-4 h-[40px] w-fit px-5"
              text="Tạo"
              textClassName="text-white"
              type="submit"
              onClick={props.handleSubmit(props.onSubmit)}
            />
          )}
        </div>
      }
    />
  );
}

export default PostEditorHeader;
