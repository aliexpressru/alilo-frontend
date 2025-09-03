import type { SVGProps } from 'react';
const SvgStop = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 15 14"
		{...props}
	>
		<rect width={14} height={14} x={0.96} fill="#fff" rx={1} />
	</svg>
);
export default SvgStop;
