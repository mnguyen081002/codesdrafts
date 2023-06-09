import { createStyles, rem } from '@mantine/core';

// link header
export const homeLink = [
  {
    link: '/about',
    label: 'Trang chủ',
  },
  {
    label: 'Khóa học',
  },
  {
    link: '/pricing',
    label: 'Blog',
  },
  {
    link: '/about',
    label: 'Liên hệ',
  },
];

// style Header

export const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    gap: rem(30),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },

  search: {
    borderRadius: rem(8),
    width: rem(1100),
    '& input': {
      height: rem(50),
    },
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'flex',
    lineHeight: 1,
    fontFamily: 'Inter, sans-serif',
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    marginRight: rem(5),
  },
}));

export const popularCourse = [
  {
    key: 'go',
    name: 'Golang',
  },
  {
    key: 'Js',
    name: 'Javascript',
  },
  {
    key: 'Java',
    name: 'Java',
  },
  {
    key: 'React',
    name: 'React',
  },
];

export const ListCourse = [
  {
    link: '/images/home/go.svg',
    name: 'Golang',
    description: 'Go là ngôn ngữ lập trình cấp cao, có kiểu dữ liệu tĩnh được thiết kế bởi Google',
  },
  {
    link: '/images/home/java.svg',
    name: 'Java',
    description: 'Java là một ngôn ngữ lập trình cấp cao, hướng đối tượng, bảo mật và mạnh mẽ,',
  },
  {
    link: '/images/home/node.svg',
    name: 'Nodejs',
    description: 'Node.js® là môi trường thời gian chạy JavaScript đa nền tảng',
  },
  {
    link: '/images/home/py.svg',
    name: 'Python',
    description:
      'Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình',
  },
  {
    link: '/images/home/react.svg',
    name: 'React',
    description: 'React làm cho việc tạo giao diện người dùng tương tác trở nên dễ dàng',
  },
  {
    link: '/images/home/javascript.svg',
    name: 'Javascript',
    description: 'JavaScript là ngôn ngữ lập trình được sử dụng để tạo trang web tương tác',
  },
];
