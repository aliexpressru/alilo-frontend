import type { SVGProps } from 'react';
const SvgBigMinus = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 22 2"
		{...props}
	>
		<path
			fill="#222"
			fillRule="evenodd"
			d="M.25 1A.75.75 0 0 1 1 .25h19.5a.75.75 0 0 1 0 1.5H1A.75.75 0 0 1 .25 1"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgBigMinus;
