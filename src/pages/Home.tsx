import { Box, Paper, PaperProps, Stack, Text, Title, TitleProps } from '@mantine/core';
import { AppLayout } from '../layout';
import { GoalsCard, RevenueChart, TotalStats, TransactionsTable } from '../components';
import totalsData from '../mocks/totals.json';
import goalsData from '../mocks/goals.json';
import transactionsData from '../mocks/transactions.json';
import revenueData from '../mocks/revenue.json';
import * as _ from 'lodash';
import moment from 'moment';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const titleProps: TitleProps = {
    order: 4,
  };

  const paperProps: PaperProps = {
    p: 'md',
  };

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <AppLayout title="Home">
        <Stack>
          <Box>
            <Title {...titleProps} my="xs">
              Welcome, John Doe
            </Title>
            <Text>We are here to help you manage your money!</Text>
          </Box>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <TotalStats data={totalsData.data} />
          <Title {...titleProps}>Goals</Title>
          <Box>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-ignore*/}
            <GoalsCard data={goalsData.data} />
          </Box>
          <Paper {...paperProps}>
            <Text size="lg" weight={600} mb="sm">
              Latest transactions
            </Text>
            <TransactionsTable
              data={_.orderBy(transactionsData.data, (d) => new Date(d.date), ['desc']).slice(0,9)}
            />
          </Paper>
          <Paper {...paperProps}>
            <Text size="lg" weight={600} mb="sm">
              Revenue transactions
            </Text>
            <RevenueChart data={_.filter(revenueData.data, (d) => moment(d.date).year() === moment().year())} />
          </Paper>
        </Stack>
      </AppLayout>
    </>
  );
};

export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
export const homeLoader = async () => {
  const res = await fetch('');

  return res.json();
};
