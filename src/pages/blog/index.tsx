import { useEffect, useState } from 'react';
import slugify from 'slugify';

import type { ListPostResponse } from '../../api/codedrafts-api';
import { StudentApi } from '../../api/codedrafts-api';
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

const Blog = () => {
  const [posts, setPosts] = useState<ListPostResponse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const r = await StudentApi.listPost({ take: 5, page: 1 });
        setPosts(r.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      <div className="my-[70px] mx-[210px] flex flex-col text-[#081B4B]">
        <div className="flex flex-col gap-10">
          <BlogTopic topic="Bài viết phổ biến" posts={posts}></BlogTopic>
          <BlogTopic topic="Công nghệ" posts={posts}></BlogTopic>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
