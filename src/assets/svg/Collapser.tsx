import type { SVGProps } from 'react';
const SvgCollapser = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 18 10"
		{...props}
	>
		<path
			fill="#222"
			fillRule="evenodd"
			d="M17.567.496a.625.625 0 0 1 0 .883L9.442 9.504a.625.625 0 0 1-.884 0L.433 1.38a.625.625 0 0 1 .884-.883L9 8.179 16.683.496a.625.625 0 0 1 .884 0"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgCollapser;
