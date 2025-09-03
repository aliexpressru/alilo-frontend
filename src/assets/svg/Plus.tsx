import type { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 21 21"
		{...props}
	>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			strokeWidth={2}
			d="M10.96 1.373v18M1.96 10.373h18"
		/>
	</svg>
);
export default SvgPlus;
