import type { SVGProps } from 'react';
const SvgVector = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 10 18"
		{...props}
	>
		<path
			fill="#222"
			fillRule="evenodd"
			d="M.496.433a.625.625 0 0 1 .883 0l8.125 8.125a.625.625 0 0 1 0 .884L1.38 17.567a.625.625 0 1 1-.883-.884L8.179 9 .496 1.317a.625.625 0 0 1 0-.884Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgVector;
