import { Center, Container, Divider, Grid, Group, Input, Menu, rem, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import PrimaryLogo from '../PrimaryLogo';
import { homeLink, ListCourse, useStyles } from './mockData';

const HeaderHome = () => {
  const { classes } = useStyles();
  const items = homeLink.map((link) => {
    if (link.label === 'Khóa học') {
      return (
        <Menu
          key={link.label}
          position="bottom-start"
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              href="/course"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <Image
                  src="/images/home/chevron-down.svg"
                  alt="arrow down"
                  width={30}
                  height={40}
                />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>
            <Container w={645} h={380} p={0}>
              <Text
                fz="md"
                sx={{
                  padding: '10px 0 10px 30px',
                }}
              >
                Khóa học
              </Text>
              <Divider
                labelPosition="center"
                sx={(theme) => ({
                  color: theme.colors.gray[5],
                })}
              />
              <Grid
                sx={{
                  padding: '10px 0 10px 30px',
                }}
              >
                {ListCourse.map((item) => (
                  <Grid.Col
                    key={item.name}
                    span={6}
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Image src={item.link} alt="logo" width={60} height={60} className="mr-2" />
                    <Group
                      sx={{
                        gap: 0,
                      }}
                    >
                      <Text fz="14px" fw={700}>
                        {item.name}
                      </Text>
                      <Text fz="14px" color="dimmed">
                        {item.description}
                      </Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Container>
          </Menu.Dropdown>
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
    <Container fluid className={classes.inner} mx={50} mb={15}>
      <Group>
        <PrimaryLogo />
      </Group>
      <Group
        spacing={5}
        w={rem(432)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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
  );
};
export default HeaderHome;
