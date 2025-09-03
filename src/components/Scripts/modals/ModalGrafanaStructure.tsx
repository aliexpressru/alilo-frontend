import { Container, Textarea, ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type ModalGrafanaProps = {
	content: string;
};

const ModalGrafana = ({
	content,
}: ModalGrafanaProps) => {
	return (
		<Container style={{ marginBottom: '16px' }}>
			<div style={{width: "100%", position: 'relative', height: 300}}>
			<Textarea
				readOnly
				rows={13}
				style={{
					fontFamily: 'monospace',
					padding: '8px'
				}}
				value={content}
			/>
				<div style={{position: 'absolute', top: '8px', right: '8px'}}>
					<CopyButton value={content} timeout={2000}>
						{({copied, copy}) => (
							<Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
								<ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
									{copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
								</ActionIcon>
							</Tooltip>
						)}
					</CopyButton>
				</div>
			</div>
		</Container>
	);
};

export { ModalGrafana };
