import { SegmentedControl } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import type { CreatePostRequest, ListTagResponse } from '../../../api/codedrafts-api';
import { StudentApi } from '../../../api/codedrafts-api';
import { InputRectangle, RFHInputThumbnail } from '../../../common/Input';
import { BlogComponent } from '../../../components/Blog/Editor';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import { RHFMutiSelect, RHFTextField } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import Header from '../../../layouts/NewHeader';
import { TOAST_CONFIG } from '../../../shared/constants/app';
import { BlogComponentType } from '../../../shared/enum/component';
import type { BlogComponentProps } from '../../../shared/interface';
import { toastPromise } from '../../../utils/app';

type FormValuesProps = {
  file: string;
  title: string;
  slug: string;
  summary: string;
  metaTitles: string[];
  tags: string;
};

const Editor = () => {
  const router = useRouter();

  const methods = useForm<FormValuesProps>({
    defaultValues: {
      summary: '',
      title: '',
      slug: '',
      metaTitles: [],
      tags: '',
    },
  });

  const [thumbnailPosition, setThumnailPosition] = useState(1);
  const [refs, setRefs] = useState<React.MutableRefObject<BlogComponentProps>[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [tagOptions, setTagOptions] = useState<ListTagResponse[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [metaTitles, setMetaTitles] = useState<string[]>([]);
  const [titleColor, setTitleColor] = useState<string>('#000000');
  const [postId, setPostId] = useState<number>();

  const { handleSubmit, reset, getValues, setError } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    let thumbnail: string;
    if (!thumbnailUpload) {
      setError('file', {
        type: 'manual',
        message: 'Vui lòng chọn ảnh',
      });
    }
    if (thumbnailUpload instanceof File) {
      const uploadRes = await StudentApi.uploadFiles([thumbnailUpload]);

      // eslint-disable-next-line prefer-destructuring
      thumbnail = uploadRes.data.urls[0];
    } else {
      thumbnail = thumbnailUpload;
    }

    const req: CreatePostRequest = {
      components: refs.map((x) => x.current),
      title: data.title,
      summary: data.summary,
      meta_title: `${metaTitles.join(',')} ${data.title}`,
      slug: data.slug,
      tags_id: tagOptions.filter((item) => tags.includes(item.title)).map((item) => item.id),
      thumbnail_url: thumbnail,
      thumbnail_style: thumbnailPosition,
      title_color: titleColor,
    };

    if (!router.query.slug) {
      const r = await toastPromise(StudentApi.createPost(req), {
        pending: 'Đang tạo bài viết',
        error: 'Tạo bài viết thất bại',
        success: 'Tạo bài viết thành công',
      });
      router.query.slug = r.data.data.slug;
      router.push(router, undefined, { shallow: true });
    } else {
      if (!postId) return;
      await toastPromise(StudentApi.updatePost({ id: postId, ...req }), {
        pending: 'Đang cập nhật bài viết',
        error: 'Cập nhật bài viết thất bại',
        success: 'Cập nhật bài viết thành công',
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const r = await StudentApi.getTags();
      setTagOptions(r.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (router.query.slug === undefined) return;
    const fetch = async () => {
      const r = await StudentApi.getPostBySlug(router.query.slug as string);

      const metaTitles = r.data.data.meta_title.split(` ${r.data.data.title}`)[0]?.split(',');
      reset({
        title: r.data.data.title,
        summary: r.data.data.summary,
        slug: r.data.data.slug,
      });
      setRefs(
        r.data.data.components.map((e) => {
          const ref: React.MutableRefObject<BlogComponentProps> = React.createRef() as any;
          ref.current = {
            type: (e as any).type,
            content: (e as any).content,
          };
          return ref;
        }),
      );
      setThumbnailUpload(r.data.data.thumbnail_url);
      setThumnailPosition(r.data.data.thumbnail_style);
      setMetaTitles(metaTitles!);
      setTags(r.data.data.tags.map((item) => item.title));
      setPostId(r.data.data.id);
      setTitleColor(r.data.data.title_color);
    };
    fetch();
  }, [router.query.slug]);

  useEffect(() => {
    if (router.query.isPreview) {
      setIsPreview(router.query.isPreview === 'true');
    }
  }, [router.query.isPreview]);

  function createNewRef() {
    const lastRef = refs[refs.length - 1];
    if (lastRef?.current.type === BlogComponentType.Text && lastRef.current.content === '<p></p>')
      return;

    const ref: React.MutableRefObject<BlogComponentProps> = React.createRef() as any;
    ref.current = {
      type: BlogComponentType.Text,
      content: '',
    };

    setRefs([...refs, ref]);
  }

  useEffect(() => {
    if (refs.length === 0) {
      createNewRef();
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <Header
        isHiddenNavbar
        right={
          <div className="flex items-center">
            <Link
              href={`/blog/${router.query.slug}`}
              onClick={() => {
                if (router.query.slug) {
                  router.push(`/blog/${router.query.slug}`);
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
                  if (router.query.slug) {
                    router.push(`/blog/${router.query.slug}`);
                  } else {
                    toast.error('Vui lòng tạo khóa học trước khi xem trước', TOAST_CONFIG);
                  }
                }}
              />
            </Link>

            {router.query.slug ? (
              <>
                <PrimaryOutlineButton
                  textHoverClassName="text-[#013F9E] px-0"
                  className="border-none hover:bg-white"
                  text="Hủy bỏ"
                  onClick={() => {
                    router.back();
                  }}
                />
                <PrimaryOutlineButton
                  bgHoverColor="hover:bg-light-primary"
                  className="w-fit px-[30px] py-[9px]"
                  textHoverClassName="text-[#ffffff]"
                  text="Cập nhật"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                />
              </>
            ) : (
              <PrimaryButton
                className="ml-4 h-[40px] w-fit px-5"
                text="Tạo"
                textClassName="text-white"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </div>
        }
      />
      <FormProvider methods={methods}>
        <div className="flex h-full w-full gap-[25px] px-[200px] pt-[60px]">
          <div className="flex w-[340px] flex-col items-center gap-[10px] rounded-md border border-light-border p-[20px] text-light-text-primary">
            <div className="w-full">
              <p className="text-lg">Ảnh bìa *</p>
            </div>
            <RFHInputThumbnail
              name="file"
              thumbnailUpload={thumbnailUpload}
              setThumbnailUpload={setThumbnailUpload}
            />
            <div className="w-full">
              <p className="text-lg">Vị trí ảnh bìa</p>
            </div>
            <div className="flex w-full items-center justify-center gap-[30px]">
              {Array.from({ length: 2 }).map((_, index) => {
                return (
                  <div
                    className={`cursor-pointer rounded-md border ${
                      thumbnailPosition === index + 1
                        ? 'border-light-primary'
                        : 'border-light-border'
                    }`}
                    key={index}
                    onClick={() => setThumnailPosition(index + 1)}
                  >
                    <img src={`/svg/thumnail-position-${index + 1}.svg`} alt="" />
                  </div>
                );
              })}
            </div>

            {thumbnailPosition === 2 && (
              <>
                <div className="w-full">
                  <p className="text-lg">Màu tiêu đề </p>
                </div>
                <SegmentedControl
                  value={titleColor}
                  onChange={setTitleColor}
                  data={[
                    { label: 'Trắng', value: '#ffffff' },
                    { label: 'Đen', value: '#000000' },
                  ]}
                />
              </>
            )}

            <RHFMutiSelect
              className="w-[300px]"
              name="tags"
              options={tagOptions.map((item) => item.title)}
              value={tags}
              setValue={setTags}
              label={'Tags *'}
              placeholder="Chọn tags"
              type="text"
              isMulti
              creatable
            />
            <RHFMutiSelect
              className="w-[300px]"
              options={metaTitles}
              value={metaTitles}
              setValue={setMetaTitles}
              name="metaTitles"
              label={'Meta title'}
              maxLength={200}
              creatable
              placeholder="Nhập meta title"
              type="text"
              isMulti
            />
          </div>
          <div className="flex w-[1000px] flex-col gap-[20px]">
            <RHFTextField
              sx={{
                '& .mantine-Input-input': {
                  height: '44px',
                  fontSize: '20px',
                  fontFamily: 'Lexend Deca',
                  fontWeight: 300,
                  '::placeholder': {
                    color: '#4C4E64CC',
                    fontSize: '20px',
                    fontFamily: 'Lexend Deca',
                    fontWeight: 300,
                  },
                },
              }}
              placeholder="Nhập tiêu đề ở đây"
              name="title"
            />
            <RHFTextField
              sx={{
                '& .mantine-Input-input': {
                  height: '44px',
                  fontSize: '16px',
                  fontFamily: 'Lexend Deca',
                  fontWeight: 300,
                  '::placeholder': {
                    color: '#4C4E64CC',
                    fontSize: '16px',
                    fontFamily: 'Lexend Deca',
                    fontWeight: 300,
                  },
                },
              }}
              placeholder="Nhập slug"
              name="slug"
            />
            <InputRectangle
              className="font-lexend-deca text-lg font-light placeholder-light-text-lessonContent/30"
              minRows={8}
              maxLength={800}
              type="text"
              placeholder="Nhập mô tả ngắn"
              name="summary"
            />
            <div>
              {refs.map((c, index) => {
                if (!c.current) return null;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (isPreview) return;
                      if (refs.length === index + 1) {
                        createNewRef();
                      }
                    }}
                  >
                    <BlogComponent
                      isFirst={index === 0 && refs.length === 1}
                      setRefs={setRefs}
                      isReadOnly={false}
                      reference={c}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default Editor;
