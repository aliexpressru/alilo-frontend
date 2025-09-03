import type { SVGProps } from 'react';
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 19"
		{...props}
	>
		<circle
			cx={4}
			cy={4}
			r={4}
			stroke="#A6A5A8"
			transform="matrix(-1 0 0 1 11.96 1)"
		/>
		<path
			stroke="#A6A5A8"
			d="M.96 14.935c0-.86.54-1.628 1.351-1.918a16.795 16.795 0 0 1 11.298 0 2.036 2.036 0 0 1 1.351 1.918v1.315c0 1.188-1.052 2.1-2.227 1.932l-.955-.136a27.001 27.001 0 0 0-7.636 0l-.955.136A1.951 1.951 0 0 1 .96 16.25v-1.315Z"
		/>
	</svg>
);
export default SvgUser;
