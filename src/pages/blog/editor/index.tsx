import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type {
  CreatePostRequest,
  ListTagResponse,
  MySeriesResponse,
} from '../../../api/codedrafts-api';
import { StudentApi } from '../../../api/codedrafts-api';
import { InputRectangle } from '../../../common/Input';
import { BlogComponent } from '../../../components/Blog/Editor';
import { RHFTextField } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import PostEditorHeader from '../../../layouts/Blog/BlogEditorHeader';
import BlogEditorLeftMenu from '../../../layouts/Blog/BlogEditorLeftMenu';
import { BlogComponentType } from '../../../shared/enum/component';
import type { BlogComponentProps } from '../../../shared/interface';
import { toastPromise } from '../../../utils/app';

export type PostEditorFormValuesProps = {
  file: string;
  title: string;
  slug: string;
  summary: string;
  metaTitles: string[];
  tags: string;
  series: string;
};

const Editor = () => {
  const router = useRouter();

  const methods = useForm<PostEditorFormValuesProps>({
    defaultValues: {
      summary: '',
      title: '',
      slug: '',
      metaTitles: [],
      tags: '',
      series: '',
    },
  });

  const [thumbnailPosition, setThumnailPosition] = useState(1);
  const [refs, setRefs] = useState<React.MutableRefObject<BlogComponentProps<any>>[]>([]);
  const [codeRefs, setCodeRefs] = useState<React.MutableRefObject<BlogComponentProps<any>>>({
    current: {
      content: '',
      type: BlogComponentType.Code,
    },
  });
  const [isPreview, setIsPreview] = useState(false);
  const [thumbnailUpload, setThumbnailUpload] = useState<any>();
  const [tagOptions, setTagOptions] = useState<ListTagResponse[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [metaTitles, setMetaTitles] = useState<string[]>([]);
  const [seriesOptions, setSeriesOptions] = useState<MySeriesResponse[]>([]);
  const [titleColor, setTitleColor] = useState<string>('#000000');
  const [postId, setPostId] = useState<number>();

  const { handleSubmit, reset, getValues, setError } = methods;

  const onSubmit = async (data: PostEditorFormValuesProps) => {
    console.log('Series', data.series);

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
      thumbnail = uploadRes.data.urls[0]!;
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
    if (router.query.slug === undefined) return;
    const fetch = async () => {
      const p1 = StudentApi.getTags();
      const p2 = StudentApi.getMySeries();
      const [r1, r2] = await Promise.all([p1, p2]);
      setTagOptions(r1.data.data);
      setSeriesOptions(r2.data.data);
      const r = await StudentApi.getPostBySlug(router.query.slug as string);

      const metaTitles = r.data.data.meta_title.split(` ${r.data.data.title}`)[0]?.split(',');
      reset({
        title: r.data.data.title,
        summary: r.data.data.summary,
        slug: r.data.data.slug,
        series: r.data.data.series?.name,
      });
      setRefs(
        r.data.data.components.map((e) => {
          const ref: React.MutableRefObject<BlogComponentProps<any>> = React.createRef() as any;
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

    const ref: React.MutableRefObject<BlogComponentProps<string>> = React.createRef() as any;
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
      <PostEditorHeader router={router} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <FormProvider methods={methods}>
        <div className="flex h-full w-full gap-[25px] px-[200px] pt-[60px] pb-[800px]">
          <BlogEditorLeftMenu
            getValues={getValues}
            postId={postId}
            setPostId={setPostId}
            thumbnailPosition={thumbnailPosition}
            setThumnailPosition={setThumnailPosition}
            thumbnailUpload={thumbnailUpload}
            setThumbnailUpload={setThumbnailUpload}
            tagOptions={tagOptions}
            tags={tags}
            setTags={setTags}
            metaTitles={metaTitles}
            setMetaTitles={setMetaTitles}
            seriesOptions={seriesOptions}
            titleColor={titleColor}
            setTitleColor={setTitleColor}
            setSeriesOptions={setSeriesOptions}
          />
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
