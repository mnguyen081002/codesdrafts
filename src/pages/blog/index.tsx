import Link from 'next/link';
import slugify from 'slugify';

import type { ListPostResponse } from '../../api/codedrafts-api';
import { StudentApi } from '../../api/codedrafts-api';
import CreatePostIcon from '../../common/Icons/CreatePostIcon';
import SwiperListCard from '../../components/Blog/SwiperListCard';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/NewHeader';

type BlogTopicProps = {
  posts: ListPostResponse[];
  topic: string;
};

function BlogTopic(props: BlogTopicProps) {
  return (
    <div>
      <div className="flex items-center gap-[24px] px-[120px]">
        <p className="text-[32px] font-bold">{props.topic}</p>
        <button className="h-fit rounded-lg border border-light-border px-[20px] py-[10px]">
          <span className="text-base font-semibold">Xem tất cả</span>
        </button>
      </div>
      <div className="flex justify-center">
        <SwiperListCard posts={props.posts} classSwiper={slugify(props.topic)} haveArrow />
      </div>
    </div>
  );
}

const Blog = (props: { posts: ListPostResponse[] }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Link href="/blog/editor" className="absolute right-10 bottom-10 h-fit w-fit rounded-full">
        <CreatePostIcon pathFill="white" className="h-[90px] w-[90px]" />
      </Link>
      <div className="h-full overflow-y-scroll">
        <Header />
        <div className="my-[70px] mx-[210px] flex flex-col text-[#081B4B]">
          <div className="flex flex-col gap-10">
            <BlogTopic topic="Bài viết phổ biến" posts={props.posts}></BlogTopic>
            <BlogTopic topic="Công nghệ" posts={props.posts}></BlogTopic>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const r = await StudentApi.listPost({ take: 5, page: 1 });

  return {
    props: {
      posts: r.data.data,
    },
  };
}

export default Blog;
