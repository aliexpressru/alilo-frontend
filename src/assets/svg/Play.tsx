import type { SVGProps } from 'react';
const SvgPlay = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 15 14"
		{...props}
	>
		<path
			fill="#1D1D1D"
			stroke="#1D1D1D"
			d="M.75 2.555a1.1 1.1 0 0 1 1.71-.915l8.167 5.445a1.1 1.1 0 0 1 0 1.83L2.46 14.36a1.1 1.1 0 0 1-1.71-.915V2.555Z"
		/>
	</svg>
);
export default SvgPlay;
