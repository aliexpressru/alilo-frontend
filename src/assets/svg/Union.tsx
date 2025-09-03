import type { SVGProps } from 'react';
const SvgUnion = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 26 17"
		{...props}
	>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			d="M20.16 15.569a5.334 5.334 0 0 0 4.8-5.307c0-3.208-2.947-5.731-6.098-5.279a.01.01 0 0 1-.01-.005A7.334 7.334 0 0 0 4.99 7.587a.01.01 0 0 1-.01.008C2.793 7.593.96 9.401.96 11.595a4 4 0 0 0 4 4h.8"
		/>
	</svg>
);
export default SvgUnion;
