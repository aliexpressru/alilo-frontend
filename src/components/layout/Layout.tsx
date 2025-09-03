import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mantine/core';
import { Header } from './Header/Header';

const Layout: FC = () => (
	<Box className="wrapper">
		<Header />
		<Box
			style={{
				backgroundColor: '#F3F4F6',
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Container size="xl" px="md" style={{ flex: 1, maxWidth: '1400px' }}>
				<main>
					<Outlet />
				</main>
			</Container>
		</Box>
	</Box>
);

export { Layout };
