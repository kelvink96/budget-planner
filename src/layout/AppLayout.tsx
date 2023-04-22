import { ReactNode, useState } from 'react';
import {
  Anchor,
  AppShell,
  Box,
  Breadcrumbs,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { HomeNavbar } from '../components';

interface IProps {
  title: string;
  children: ReactNode;
}

const AppLayout = ({ children, title }: IProps): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const items = [
    { title: 'Overviews', href: '/' },
    { title, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<HomeNavbar px="md" pt="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} />}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={4}>Budget planner</Title>
          </div>
        </Header>
      }
    >
      <Box>
        <Breadcrumbs mb="md">{items}</Breadcrumbs>
        {children}
      </Box>
    </AppShell>
  );
};

export default AppLayout;
