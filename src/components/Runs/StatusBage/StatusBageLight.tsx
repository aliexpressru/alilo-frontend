import { FC } from 'react';
import styles from './StatusBage.module.css';
import { Box, Group, Text } from '@mantine/core';
import cn from 'classnames';

const cx = cn.bind(styles);

interface StatusBageLightProps {
	status: string | undefined;
	withoutLabel?: boolean;
}

const StatusBageLight: FC<StatusBageLightProps> = ({ status, withoutLabel }) => {
	const render = (dotClass: string, textClass: string, label: string) => (
		<Group gap="xs" align="center" className={cx(styles['badge-light'])}>
			<div className={cx(styles['dot'], styles[dotClass])} />
			{!withoutLabel && (
				<Text size="sm" className={cx(styles[textClass])}>
					{label}
				</Text>
			)}
		</Group>
	);

	switch (status) {
		case 'STATUS_PREPARED':
			return render('prepared-light-bc', 'prepared-light-c', 'Prepared');
		case 'STATUS_RUNNING':
			return render('running-light-bc', 'running-light-c', 'Running');
		case 'STATUS_STOPPING':
			return render('stopping-light-bc', 'stopping-light-c', 'Stopping');
		case 'STATUS_STOPPED_UNSPECIFIED':
			return render('stopped-light-bc', 'stopped-light-c', 'Stopped');
		case 'STATUS_FAILED':
			return render('failed-light-bc', 'failed-light-c', 'Failed');
		default:
			return (
				<Box className={cx(styles['badge'], styles['unknown'])}>
					<Text size="sm">{status}</Text>
				</Box>
			);
	}
};

export { StatusBageLight };
