import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { UnderlineNavbar } from '../NavBar/UnderlineNavbar';

function CourseUnderlineNavBar() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { selection } = router.query;

    if (!selection) {
      router.replace(`${router.asPath}?selection=overview`, undefined, { shallow: true });
    }
  }, [router.query.selection]);
  return (
    <UnderlineNavbar
      navs={[
        {
          title: 'Thông tin khóa học',
          slug: 'overview',
        },
        {
          title: 'Đánh giá',
          className: 'px-[10px]',
          slug: 'review',
        },
      ]}
    />
  );
}

export default CourseUnderlineNavBar;
