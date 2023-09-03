import type { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';

import type { GetPostBySlugResponse, ListPostResponse } from '../../api/codedrafts-api';
import { StudentApi } from '../../api/codedrafts-api';
import { BlogComponent } from '../../components/Blog/Editor';
import SwiperListCard from '../../components/Blog/SwiperListCard';
import { Avatar } from '../../components/sub/avatar';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/NewHeader';
import type { BlogComponentProps } from '../../shared/interface';
import { initFacebookSdk, shareFacebook } from '../../utils/fbsdk';

export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);

  const { slug } = context.query;

  const r = await StudentApi.getPostBySlug(slug as string);
  return {
    props: {
      post: r.data.data,
    },
  };
}

const BlogPost = (props: { post: GetPostBySlugResponse }) => {
  const [refs, setRefs] = useState<React.MutableRefObject<BlogComponentProps>[]>([]);
  const [listSuggest, setListSuggest] = useState<ListPostResponse[]>([]);
  const router = useRouter();
  const [titleColor, setTitleColor] = useState<string>('text-[#171717]');

  useEffect(() => {
    if (router.query.slug === undefined) return;
    const fetch = async () => {
      // const r = await StudentApi.getPostBySlug(router.query.slug as string);
      StudentApi.listPost({ take: 5, page: 1 }).then((r) => setListSuggest(r.data.data));
      setRefs(
        props.post.components.map((e) => {
          const ref: React.MutableRefObject<BlogComponentProps> = React.createRef() as any;
          ref.current = {
            type: (e as any).type,
            content: (e as any).content,
          };
          return ref;
        }),
      );

      setTitleColor(props.post?.title_color === '#ffffff' ? 'text-white' : 'text-[#171717]');
    };
    fetch();
  }, [router.isReady]);

  useEffect(() => {
    initFacebookSdk();
  }, []);

  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => console.log(`script loaded correctly, window.FB has been populated`)}
      />
      <Header />
      <div className="flex flex-col items-center gap-[40px] text-[#171717]">
        <div
          className={`flex max-h-[440px] w-full flex-col items-center justify-center gap-[30px] px-[145px] pt-[80px] lg:h-[440px] ${titleColor}`}
          style={{
            backgroundImage:
              props.post?.thumbnail_style === 2 ? `url(${props.post?.thumbnail_url})` : 'none',
          }}
        >
          <p className="max-w-[960px] text-center text-[56px] font-bold leading-[64px]">
            {props.post?.title}
          </p>
          <div className="flex flex-col items-center gap-[15px]">
            <div className="flex h-[50px] items-center gap-[9px]">
              <Avatar h={50} w={50} url={props.post?.author.avatar} />
              <div className="flex h-[46px] flex-col justify-between">
                <p className="text-xl font-medium leading-none tracking-[0.15px]">
                  {props.post?.author.username}
                </p>
                <p
                  className={`text-lg font-normal leading-none tracking-[0.15px] ${
                    titleColor === 'text-white' ? 'text-[#D3D3D3]' : 'text-light-text-primary'
                  }`}
                >
                  {props.post?.author.title}
                </p>
              </div>
            </div>
            <p
              className={`text-[18px] ${
                titleColor === 'text-white' ? 'text-white' : 'text-light-text-primary'
              }`}
            >
              Ngày đăng:{' '}
              {new Date(props.post ? props.post.created_at : Date.now()).toLocaleDateString()} • 3
              phút đọc
            </p>
          </div>
        </div>
        <div className="my-[30px] flex w-[1400px] justify-between pl-[150px] text-[20px]">
          <div className="flex max-w-[933px] flex-col gap-[15px]">
            {props.post?.thumbnail_style === 1 && (
              <img
                src="https://res.cloudinary.com/titus-nguyen/image/upload/v1693660182/nwiu180o3qqhle73bg4r.jpg"
                alt=""
              />
            )}
            <p>{props.post?.summary}</p>
            {refs.map((c, index) => {
              if (!c.current) return null;
              return (
                <BlogComponent isReadOnly={true} setRefs={setRefs} reference={c} key={index} />
              );
            })}
          </div>
          <div className="flex w-[208px] flex-col gap-[10px]">
            <p className="text-base font-semibold">Chia Sẻ</p>
            <div className="flex justify-between">
              <img
                src="/svg/blog-icon-fb.svg"
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  shareFacebook(window.location.href);
                }}
              />
              <img src="/svg/blog-icon-twitter.svg" alt="" />
              <img src="/svg/blog-icon-in.svg" alt="" />
              <img src="/svg/blog-icon-tiktok.svg" alt="" />
            </div>
            {props.post?.tags.map((e) => {
              return (
                <div
                  key={e.id}
                  className="flex h-[30px] w-fit items-center justify-center rounded-md bg-[#EFF2FB] px-[10px] py-[4px]"
                >
                  <p className="text-xs">{e.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#F9FAFE] py-[100px] text-[#081B4B]">
        <div className="flex flex-col items-center gap-[50px]">
          <p className="text-[36px] font-bold">Bài viết liên quan</p>
          <div className="flex gap-[32px]">
            <div className="flex justify-center">
              <SwiperListCard
                posts={listSuggest}
                classSwiper={slugify('Bài viết liên quan')}
                haveArrow
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
