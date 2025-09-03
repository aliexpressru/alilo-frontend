import {
    // RingProgress,
    Text,
    // SimpleGrid,
    Paper,
    // Center,
    Group,
    rem,
    // rem
    PaperProps
} from '@mantine/core';
// import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';


// const data = [
//     { label: 'Page views', stats: '456,578', progress: 65, color: 'teal', icon: 'up' },
//     { label: 'New users', stats: '2,550', progress: 72, color: 'blue', icon: 'up' },
//     {
//         label: 'Orders',
//         stats: '4,735',
//         progress: 52,
//         color: 'red',
//         icon: 'down',
//     },
// ] as const;

// const icons = {
//     up: IconArrowUpRight,
//     down: IconArrowDownRight,
// };

interface IStatsRing extends Omit<PaperProps, 'withBorder' | 'radius' | 'p' | 'key'> {
    // key?: React.Key | null | undefined
    // label?: React.ReactNode
    // flex?: number
    label: string
    stats: string | React.ReactNode
}

export function StatsField({ label, stats, ...rest }: IStatsRing) {
    return (
        <Paper withBorder radius="md" p="6" key={label} {...rest}>
            <Group>
                <div style={{ marginLeft: rem(3) }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                        {label}
                    </Text>
                    <Text fw={500} size="md">
                        {stats}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
}
