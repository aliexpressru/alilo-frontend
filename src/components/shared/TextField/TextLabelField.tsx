import { Flex, Text } from '@mantine/core';
import styles from './LabelField.module.css';

type TextLabelFieldProps = {
	label: string;
	value: string;
};

const TextLabelField = ({ label, value }: TextLabelFieldProps) => (
	<Flex direction="column" className={styles['text-field']} gap={4}>
		<Text size="xs" c="dimmed">
			{label}
		</Text>
		<Text>{value}</Text>
	</Flex>
);

export { TextLabelField };
