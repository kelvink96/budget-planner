import { createStyles, Group, Paper, rem, SimpleGrid, Text } from '@mantine/core';
import { IconDeviceGamepad2, IconGift, IconPaint, IconPlane } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    padding: 0,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const icons = {
  trip: IconPlane,
  paint: IconPaint,
  game: IconDeviceGamepad2,
  cake: IconGift,
};

interface IProps {
  data: {
    title: string;
    icon: "trip" | "paint" | "game" | "cake";
    budget: string;
  }[];
}

const GoalsCard = ({ data }: IProps) => {
  const { classes } = useStyles();

  const items = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Text className={classes.value} mt={24}>
          {stat.budget}
        </Text>
      </Paper>
    );
  });

  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'xs', cols: 1 },
      ]}
    >
      {items}
    </SimpleGrid>
  );
};

export default GoalsCard;
