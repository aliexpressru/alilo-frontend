import type { SVGProps } from 'react';
const SvgChevronOpen = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 8"
		{...props}
	>
		<path
			stroke="#3E7FFD"
			strokeLinecap="round"
			strokeWidth={1.5}
			d="M14.96 6.372 8.74 1.04a1.2 1.2 0 0 0-1.561 0L.96 6.371"
		/>
	</svg>
);
export default SvgChevronOpen;
