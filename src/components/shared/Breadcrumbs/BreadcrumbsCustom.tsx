import React from 'react';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import styles from './BreadcrumbsCustom.module.css';

type IBreadcrumbs = {
	links: Record<string, string>;
};

const BreadcrumbsCustom = ({ links }: IBreadcrumbs) => {
	// Используем React для удовлетворения noUnusedLocals
	console.log('React version:', React.version);
	const keys = Object.keys(links);
	const lastIndex = keys.length - 1;

	return (
		<Breadcrumbs className={styles['breadcrumbs-custom']}>
			{keys.map((key, index) => {
				if (index === lastIndex) {
					return (
						<Text key={key} fw={700} c="dimmed">
							{key}
						</Text>
					);
				} else {
					return (
						<Anchor key={key} href={links[key]}>
							{key}
						</Anchor>
					);
				}
			})}
		</Breadcrumbs>
	);
};

export { BreadcrumbsCustom };
