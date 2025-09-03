import type { SVGProps } from 'react';
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		width="1em"
		height="1em"
		strokeMiterlimit={10}
		style={{
			fillRule: 'nonzero',
			clipRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		}}
		viewBox="0 0 25 25"
		{...props}
	>
		<g
			fill="none"
			stroke="#1d1d1d"
			strokeLinejoin="miter"
			strokeOpacity={0.5}
		>
			<path
				strokeLinecap="butt"
				d="M8.5 3.5h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z"
			/>
			<path d="M18 7.901a2.999 2.999 0 0 1 1.5 2.599v8a3 3 0 0 1-3 3h-4c-1.11 0-2.08-.603-2.599-1.5" />
		</g>
	</svg>
);
export default SvgCopy;
