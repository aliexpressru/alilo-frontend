import { CSSProperties } from 'react';

type IABageProps = {
	type:
	| 'neutral'
	| 'neutral-light'
	| 'success'
	| 'success-light'
	| 'warning'
	| 'warning-light'
	| 'alert'
	| 'alert-light';
	text: string;
	style?: CSSProperties;
};

const Bage = ({ type, text, style }: IABageProps) => {
	const aliStyleMapping = new Map<string, React.CSSProperties>([
		[
			'neutral',
			{
				background: '#222222',
				borderRadius: '8px',
				color: '#FFFFFF',
				width: 'fit-content',
			},
		],
		[
			'neutral-light',
			{
				background: 'rgba(34, 34, 34, 0.12)',
				borderRadius: '8px',
				color: '#222222',
				width: 'fit-content',
			},
		],
		[
			'success',
			{
				background: '#00760C',
				borderRadius: '8px',
				color: '#FFFFFF',
				width: 'fit-content',
			},
		],
		[
			'success-light',
			{
				background: '#E0EFE2',
				borderRadius: '8px',
				color: '#222222',
				width: 'fit-content',
			},
		],
		[
			'warning',
			{
				background: '#FFF625',
				borderRadius: '8px',
				color: '#222222',
				width: 'fit-content',
			},
		],
		[
			'warning-light',
			{
				background: '#FFFBA8',
				borderRadius: '8px',
				color: '#222222',
				width: 'fit-content',
			},
		],
		[
			'alert',
			{
				background: '#A61111',
				borderRadius: '8px',
				color: '#FFFFFF',
				width: 'fit-content',
			},
		],
		[
			'alert-light',
			{
				background: '#F1D9D9',
				borderRadius: '8px',
				color: '#222222',
				width: 'fit-content',
			},
		],
	]);

	return (
		<div style={{ ...aliStyleMapping.get(type), ...style }}>
			<div style={{ padding: '0px 12px', textAlign: 'center' }}>
				{text}
			</div>
		</div>
	);
};

export { Bage };
