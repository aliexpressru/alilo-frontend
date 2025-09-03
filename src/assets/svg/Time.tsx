import type { SVGProps } from 'react';
const SvgTime = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 22 22"
		{...props}
	>
		<circle cx={10.96} cy={11} r={10} stroke="#A6A5A8" />
		<path
			stroke="#A6A5A8"
			strokeLinecap="round"
			d="M10.96 7v3.732a.5.5 0 0 0 .223.416L13.96 13"
		/>
	</svg>
);
export default SvgTime;
