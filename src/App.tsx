import { RouterProvider } from './router/RouterProvider';
import { ErrorBoundary } from './components/shared/ErrorBoundary';

import { createTheme, MantineProvider, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

const myColor: MantineColorsTuple = [
	'#ffe7e7',
	'#ffcfce',
	'#ff9d9b',
	'#ff6864',
	'#fe3b36',
	'#fe1e19',
	'#ff0b08',
	'#e30000',
	'#cc0000',
	'#b20000'
];

const theme = createTheme({
	colors: {
		myColor,
	},
	fontFamily: '"Trebuchet MS","Lucida Sans Unicode","Lucida Grande","Lucida Sans",Arial,sans-serif'
});

const App: React.FC = () => (
	<ErrorBoundary onCaptureError={console.error}>
		<MantineProvider theme={theme}>
			<Notifications limit={1} />
			<ModalsProvider
				modalProps={{
					removeScrollProps: {
						removeScrollBar: false,
						allowPinchZoom: false,
					},
					size: 'xl',
					radius: 'md',
				}}
			>
				<RouterProvider />
			</ModalsProvider>
		</MantineProvider>
	</ErrorBoundary>
);

export default App;
