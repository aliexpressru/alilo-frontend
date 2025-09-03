import type { SVGProps } from 'react';
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 25 25"
		{...props}
	>
		<path
			stroke="#1D1D1D"
			strokeOpacity={0.5}
			d="M6.01 9.107c-.844-1.126-.04-2.734 1.368-2.734h11.164c1.408 0 2.212 1.608 1.367 2.734a4.747 4.747 0 0 0-.949 2.848v6.418a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6.418a4.747 4.747 0 0 0-.95-2.848Z"
		/>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			strokeOpacity={0.5}
			d="m16.96 6.373-.544-1.632a2 2 0 0 0-1.898-1.368h-3.117a2 2 0 0 0-1.897 1.368L8.96 6.373"
		/>
	</svg>
);
export default SvgTrash;
