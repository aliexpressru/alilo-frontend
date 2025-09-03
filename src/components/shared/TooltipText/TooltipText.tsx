import { Tooltip, Text } from "@mantine/core";


type TooltipText = {
	size: number;
	text: string;
	onClick?: VoidFunction;
};

const TooltipText = ({ text, size, onClick }: TooltipText) => {
	const needShow = text.length > size;
	return (
		<Tooltip label={text} onClick={onClick}>
			<Text>{text.slice(0, size)}{needShow ? "..." : ""}</Text>
		</Tooltip>
	);
};

export { TooltipText };
