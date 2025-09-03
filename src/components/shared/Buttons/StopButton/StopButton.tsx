import { Stack } from '@mantine/core';
import { Stop } from '../../../../assets/svg';
import styles from './StopButton.module.css';
import { runService } from '../../../../services/api';
import { snackbarService } from '../../../../services/snackbarService';
import { RunStatus } from '../../../../types/RunTypes';
import {IconButton} from "../IconButton";

type StopButtonProops = {
	groupId: number;
	runStatus: RunStatus | unknown;
};

const StopButton = ({ groupId, runStatus }: StopButtonProops) => {
	const handleStopRun = (stopRunId: number) => {
		runService.stopRun(stopRunId).then((response) => {
			switch (response.status) {
				case true:
					snackbarService.addSnack({
						palette: 'success',
						title: 'Run stopped',
					});
					break;
				case false:
					snackbarService.addSnack({
						palette: 'danger',
						title: 'Error stopping run',
					});
					break;
				default:
					break;
			}
		});
	};

	const stopButton = (status: string | unknown) => {
		const isDisabled = !['STATUS_PREPARED', 'STATUS_RUNNING'].includes(status as string);

		return (
			<IconButton icon={Stop}
				onClick={() => handleStopRun(groupId)}
				className={styles['stop-button']}
				disabled={isDisabled}
			>
			</IconButton>
		);
	};

	return (
		<Stack>
			{stopButton(runStatus)}
		</Stack>
	);
};

export { StopButton };
