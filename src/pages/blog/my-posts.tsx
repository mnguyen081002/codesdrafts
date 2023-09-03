import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import type { ListPostResponse } from '../../api/codedrafts-api';
import { StudentApi } from '../../api/codedrafts-api';
import PostCard from '../../components/Blog/PostCard';
import { requireAuth } from '../../components/requireAuth';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/NewHeader';

const MyPosts = () => {
  const [posts, setPosts] = useState<ListPostResponse[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const r = await StudentApi.listMyPost({ take: 10, page: 1 });
      setPosts(r.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center text-[#081B4B]">
      <Header />
      {/* <div className="grid grid-cols-3 gap-4">} */}
      <div className="mt-[60px] flex items-center justify-center">
        <p className="text-[36px] font-semibold"> Bài viết của bạn</p>
      </div>
      <div className="grid w-[1300px] grid-cols-3 py-[50px]">
        {posts.map((e) => (
          <PostCard href={`/blog/editor?slug=${e.slug}`} key={e.id} post={e} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyPosts;
export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
