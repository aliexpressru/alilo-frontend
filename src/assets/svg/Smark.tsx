import type { SVGProps } from 'react';
const SvgSmark = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		{...props}
	>
		<rect width={32} height={32} fill="#CF6" rx={8} />
		<circle cx={16} cy={16} r={11.5} fill="#1D1D1D" />
		<path
			fill="#CF6"
			d="M15.953 27.906c6.54 0 11.953-5.425 11.953-11.953C27.906 9.414 22.481 4 15.941 4 9.414 4 4 9.414 4 15.953c0 6.528 5.426 11.953 11.953 11.953m-1.312-6.222c-.399 0-.727-.165-1.032-.575L10.668 17.5c-.176-.234-.281-.492-.281-.762 0-.527.41-.96.937-.96.34 0 .598.105.89.492l2.38 3.07 5.004-8.04c.222-.35.527-.538.832-.538.515 0 .996.351.996.902 0 .258-.153.527-.293.774l-5.508 8.671c-.246.387-.586.575-.984.575"
		/>
	</svg>
);
export default SvgSmark;
