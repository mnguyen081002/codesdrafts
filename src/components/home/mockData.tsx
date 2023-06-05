import { createStyles, rem } from '@mantine/core';

// link header
export const homeLink = [
  {
    link: '/about',
    label: 'Trang chủ',
  },
  {
    label: 'Khóa học',
    links: [
      {
        link: '/docs',
        label: 'Documentation',
      },
      {
        link: '/resources',
        label: 'Resources',
      },
      {
        link: '/community',
        label: 'Community',
      },
      {
        link: '/blog',
        label: 'Blog',
      },
    ],
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  search: {
    borderRadius: rem(8),
    width: rem(950),
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
    fontSize: theme.fontSizes.sm,
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
