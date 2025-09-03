import type { SVGProps } from 'react';
const SvgChevronClose = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 8"
		{...props}
	>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			strokeWidth={1.5}
			d="m.96 1.372 6.219 5.33a1.2 1.2 0 0 0 1.562 0l6.219-5.33"
		/>
	</svg>
);
export default SvgChevronClose;
