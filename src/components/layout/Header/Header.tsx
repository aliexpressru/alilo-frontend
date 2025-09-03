import {
	Avatar,
	Box,
	// Container,
	// Flex,
	Group, Image,
	Space
} from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.css';
import { routes } from '../../../router/routes';
import LogoPng from '@assets/svg/sources/AliLoadLogo.svg';

const links = [
	{ link: routes.projects.path, label: 'Projects' },
	{ link: routes.activeRuns.path, label: 'Runs' },
	{ link: routes.agents.path, label: 'Agents' },
	{ link: routes.files.path, label: 'S3' },
	{ link: routes.help.path, label: 'Help' }
];

export function Header() {
	const items = links.map((link) => {

		return (
			<a
				key={link.label}
				href={link.link}
				className={classes['link']}
				// eslint-disable-next-line no-undefined
				data-active={window.location.pathname === link.link || undefined}
				onClick={() => {
					// event.preventDefault();
					// setActive(link.link);
				}}
			>
				{link.label}
			</a>
		);
	}).filter((item) => item !== null);

	const userCharsOfName = localStorage.getItem("userNameChars");

	return (
		<Box>
			<header className={classes['header']}>
				<Group justify="space-between" h="100%" gap={"md"}>

					<Group h="100%" gap={0} visibleFrom="sm">
						<Image src={LogoPng} />
						<Space w="xl" />
						{items}
					</Group>

					<Group visibleFrom="sm">
						<Avatar color="white" radius="xl">{userCharsOfName}</Avatar>
					</Group>
				</Group>
			</header>
		</Box>
	);
}
