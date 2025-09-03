import { FC } from 'react';
import styles from './Page.module.css';
import { Box, Container, LoadingOverlay, Title } from '@mantine/core';
type IPage = {
	title: string;
	status?: React.ReactNode;
	loading: boolean;
	breadcrumbs?: React.ReactNode;
	children?: React.ReactNode;
};


const Page: FC<IPage> = ({ title, status, breadcrumbs, loading, children }) => {
	return (
		<>
			<Container className={styles['title']}>
				{breadcrumbs ? breadcrumbs : (<div style={{height: "30px"}}></div>)}
				<Title order={1} fw={700}>
					{title} {status}
				</Title>
			</Container>
			<Container className={styles['wrapper']}>
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
						loaderProps={{ color: "#d63426", type: 'bars' }}
					/>
					{children}
				</Box>
			</Container>
		</>
	);
};

export { Page };
