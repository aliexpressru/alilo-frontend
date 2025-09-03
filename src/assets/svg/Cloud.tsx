import type { SVGProps } from 'react';
const SvgCloud = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 26 20"
		{...props}
	>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			d="M20.16 15.569a5.334 5.334 0 0 0 4.8-5.307c0-3.208-2.947-5.731-6.098-5.279a.01.01 0 0 1-.01-.005A7.334 7.334 0 0 0 4.99 7.587a.01.01 0 0 1-.01.008C2.793 7.593.96 9.401.96 11.595a4 4 0 0 0 4 4h.8"
		/>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			d="m9.96 13.53 2.646-2.647a.5.5 0 0 1 .707 0l2.647 2.646M12.96 11.73v7.2"
		/>
	</svg>
);
export default SvgCloud;
