import { notifications } from '@mantine/notifications';
import type { MantineColor } from '@mantine/core';

// Map your custom palette to Mantine colors
const PALETTE_TO_MANTINE_COLOR: Record<Palette, MantineColor> = {
	transparent: 'transparent',
	primary: 'blue',
	secondary: 'gray',
	tertiary: 'violet',
	success: 'green',
	info: 'cyan',
	danger: 'red',
	warning: 'yellow',
	light: 'gray.1',
	dark: 'dark.4',
};

export type Palette =
	| 'transparent'
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'success'
	| 'info'
	| 'danger'
	| 'warning'
	| 'light'
	| 'dark';

export type SnackProps = {
	title?: React.ReactNode;
	palette?: Palette;
	message?: string;
	duration?: number;
};

class SnackbarService {
	private defaultDuration: number;

	constructor({ snackDuration = 2000 } = {}) {
		this.defaultDuration = snackDuration;
	}
	// simple adapter, because before was custom
	addSnack(snack: SnackProps) {
		const color = snack.palette ? PALETTE_TO_MANTINE_COLOR[snack.palette] : 'blue';

		notifications.show({
			title: snack.title,
			message: snack.message,
			color,
			autoClose: snack.duration ?? this.defaultDuration,
		});
	}
}

export const snackbarService = new SnackbarService();

// Usage:
// snackbarService.show({
//   palette: 'danger',
//   title: 'Error',
//   message: 'Something went wrong'
// });
