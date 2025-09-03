import { Text, Button } from '@mantine/core';
import styles from './SimpleButton.module.css';
import React from "react";

type SimpleButtonProps = any & {
	children?: React.ReactNode;
};

const SimpleButton = ({ children, ...rest }: SimpleButtonProps) => (
	<Button
		className={styles['simple-button']}
		{...rest}
	>
		<Text>{children}</Text>
	</Button>
);

export { SimpleButton };
