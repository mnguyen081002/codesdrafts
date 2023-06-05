import { Center, Container, Group, Header, Input, Menu, rem } from '@mantine/core';
import Image from 'next/image';

import { homeLink, useStyles } from './mockData';

const HeaderHome = () => {
  const { classes } = useStyles();
  const items = homeLink.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <Image
                  src="/images/home/chevron-down.svg"
                  alt="arrow down"
                  width={20}
                  height={20}
                />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });
  return (
    <Header height={100} sx={{ borderBottom: 0 }} mt={22}>
      <Container fluid className={classes.inner}>
        <Group>
          <Image src="/logo-96.png" alt="logo" width={50} height={50} />
        </Group>
        <Group spacing={5} w={rem(332)}>
          {items}
        </Group>
        <Group position="center">
          <Input
            placeholder="Tìm kiếm"
            className={classes.search}
            rightSection={
              <Image src="/images/home/Adornment-End.svg" alt="search" width={20} height={20} />
            }
          />
        </Group>
        <Group position="left" w={50}>
          <Image
            className="cursor-pointer"
            src="/images/home/Avatar.png"
            alt="search"
            width={40}
            height={40}
          />
        </Group>
      </Container>
    </Header>
  );
};
export default HeaderHome;
