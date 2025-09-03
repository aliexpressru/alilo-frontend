import { Stack, Text, Box, rem } from '@mantine/core';
import { EmptyData } from '../../../assets/svg';

const NoData = () => (
	<Stack align="center" justify="center" style={{ minHeight: rem(200) }}>
		<Box w={rem(64)} h={rem(64)}>
			<EmptyData style={{ width: '100%', height: '100%' }} />
		</Box>
		<Text c="gray" fw={500} size="md">
			No data
		</Text>
	</Stack>
);

export { NoData };
