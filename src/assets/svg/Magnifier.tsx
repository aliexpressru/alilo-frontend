import type { SVGProps } from 'react';
const SvgMagnifier = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<ellipse
			cx={7.919}
			cy={7.752}
			stroke="#A6A5A8"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			rx={6.919}
			ry={6.752}
		/>
		<path
			stroke="#A6A5A8"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12.676 12.78 17 17"
		/>
	</svg>
);
export default SvgMagnifier;
