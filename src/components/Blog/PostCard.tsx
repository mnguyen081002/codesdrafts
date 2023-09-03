import Link from 'next/link';

import type { ListPostResponse } from '../../api/codedrafts-api';
import { postFormatDate } from '../../utils/app';

const PostCard = ({ post, href }: { post?: ListPostResponse; href: string }) => {
  if (!post) return null;
  return (
    <swiper-slide
      style={{
        padding: '20px 20px',
        width: 'auto',
        display: 'block',
        height: '100%',
        maxHeight: '100%',
      }}
    >
      <Link href={href}>
        <div className="relative h-fit w-[400px] cursor-pointer overflow-hidden rounded-md bg-white shadow-blogCard transition-all duration-500 ease-in-out hover:shadow-blogCardHover">
          <div className="absolute top-3 left-3 h-[38px] rounded-md bg-[#D3DDFF] py-[7px] px-[15px]">
            <p className="text-base font-bold">{post.tags[0]?.title}</p>
          </div>
          <img
            src="https://res.cloudinary.com/titus-nguyen/image/upload/v1693662163/t1n2vxsw2snadksnizib.jpg"
            alt=""
            className="h-[220px] w-full"
          />
          <div className="flex flex-col gap-[10px] py-[23px] px-[30px]">
            <p className="text-[20px] font-bold">{post.title}</p>
            <div>
              <a href="" className="text-[#0069FF]">
                {post.author.username}
              </a>
              <p className="text-[#4D5B7C]">{postFormatDate(post?.created_at)} • 3 phút đọc</p>
            </div>
          </div>
        </div>
      </Link>
    </swiper-slide>
  );
};

export default PostCard;
