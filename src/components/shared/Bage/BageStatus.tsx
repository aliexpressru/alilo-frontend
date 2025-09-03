import { FC } from 'react';
import { Bage } from './Bage';

interface IABageStatus {
	status: string | undefined;
}

const BageStatus: FC<IABageStatus> = ({ status }) => {
	switch (status) {
		case 'STATUS_STOPPED_UNSPECIFIED':
			return (
				<Bage
					type="neutral-light"
					text="Stopped"
					style={{ height: '36px', paddingTop: '3px' }}
				/>
			);
		case 'STATUS_PREPARED':
			return (
				<Bage
					type="success-light"
					text="Preparing"
					style={{ height: '36px', paddingTop: '3px' }}
				/>
			);
		case 'STATUS_RUNNING':
			return (
				<Bage
					type="success"
					text="Running"
					style={{ height: '36px', paddingTop: '3px' }}
				/>
			);
		case 'STATUS_STOPPING':
			return (
				<Bage
					type="warning-light"
					text="Stopping"
					style={{ height: '36px', paddingTop: '3px' }}
				/>
			);
		default:
			return (
				<Bage
					type="neutral"
					text={status ? status : 'None'}
					style={{ height: '36px', paddingTop: '3px' }}
				/>
			);
	}
};

export { BageStatus };
