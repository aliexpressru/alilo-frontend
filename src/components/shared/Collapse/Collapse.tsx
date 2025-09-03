import { Box, Collapse as MantineCollapse, Divider, Group, Title } from '@mantine/core';
import { ChevronClose, ChevronOpen } from '../../../assets/svg';
import { FC, useState } from 'react';
import styles from './Collapse.module.css';

type CollapseProps = {
	title: string;
	children: React.ReactNode;
	isCollapsed?: boolean;
};

const Collapse: FC<CollapseProps> = ({ title, children, isCollapsed }) => {
	const [isVisible, setIsVisible] = useState<boolean>(isCollapsed ?? false);
	const handleClickCollapse = () => {
		setIsVisible((v) => !v);
	};

	return (
		<Box className={styles['box']} p="md" bg="gray.0" w="100%">
			<Group
				align="center"
				onClick={handleClickCollapse}
				className={styles["header"]}
				style={{ cursor: 'pointer' }}
			>
				<Title order={5} className={styles[isVisible ? 'header-open' : 'header-close']}>
					{title}
				</Title>
				{isVisible ? <ChevronOpen /> : <ChevronClose />}
			</Group>

			<MantineCollapse in={isVisible}>
				<Divider className={styles['custom-divider']} size="xs" my="sm" />
				<Box>{children}</Box>
			</MantineCollapse>
		</Box>
	);
};

export { Collapse };
