import type { SVGProps } from 'react';
const SvgUserIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 28"
		{...props}
	>
		<path
			fill="#222"
			fillRule="evenodd"
			d="M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0m2 0A6 6 0 1 1 6 6a6 6 0 0 1 12 0M2 24a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v2H2zm-2 0c0-5.523 4.477-10 10-10h4c5.523 0 10 4.477 10 10v3a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgUserIcon;
