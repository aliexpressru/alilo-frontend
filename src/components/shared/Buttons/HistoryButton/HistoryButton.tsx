import { ButtonProps } from '@mantine/core';
import type { ComponentProps } from 'react';
import ClockSvg from '@assets/svg/sources/clock.svg';
import {SimpleButton} from "../SimpleButton";

type HistoryButtonProps = ButtonProps & ComponentProps<'button'>;

const HistoryButton = ({ onClick, ...rest }: HistoryButtonProps) => (
	<SimpleButton
		variant="default"
		onClick={onClick}
		{...rest}
		style={{ padding: 8, border: 'none' }}
	>
		<img style={{ marginTop: 5 }} src={ClockSvg} alt="History" />
	</SimpleButton>
);

export { HistoryButton };
