import { FC } from 'react';
import styles from './StatusBage.module.css';
import { Box, Text } from '@mantine/core';
import cn from 'classnames';

const cx = cn.bind(styles);

interface StatusBageProps {
	status?: string;
	defaultStatusAsStopped?: boolean;
}

const StatusBage: FC<StatusBageProps> = ({ status, defaultStatusAsStopped }) => {
	const getContent = (text: string, className: string) => (
		<Box className={cx(styles['badge'], styles[className])}>
			<Text size="sm">{text}</Text>
		</Box>
	);

	switch (status) {
		case 'STATUS_PREPARED':
			return getContent('Prepared', 'prepared');
		case 'STATUS_RUNNING':
			return getContent('Running', 'running');
		case 'STATUS_STOPPING':
			return getContent('Stopping', 'stopping');
		case 'STATUS_STOPPED_UNSPECIFIED':
			return getContent('Stopped', 'stopped');
		case 'STATUS_SCHEDULED':
			return getContent('Scheduled', 'scheduled');
		default:
			return defaultStatusAsStopped
				? getContent('Stopped', 'stopped')
				: getContent('Unknown', 'unknown');
	}
};

export { StatusBage };
