import type { SVGProps } from 'react';
const SvgBigPlus = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 22 22"
		{...props}
	>
		<path
			fill="#222"
			fillRule="evenodd"
			d="M12 1.25a.75.75 0 0 0-1.5 0v9h-9a.75.75 0 0 0 0 1.5h9v9a.75.75 0 0 0 1.5 0v-9h9a.75.75 0 0 0 0-1.5h-9z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgBigPlus;
