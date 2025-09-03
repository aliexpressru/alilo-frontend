import type { SVGProps } from 'react';
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 25 25"
		{...props}
	>
		<mask id="clock_svg__a" fill="#fff">
			<path d="M7.824 18.932a.488.488 0 0 0 .093.707 8.553 8.553 0 1 0-3.558-5.752c.041.279.314.456.59.398a.54.54 0 0 0 .413-.609 7.53 7.53 0 1 1 3.19 5.16.54.54 0 0 0-.728.096" />
		</mask>
		<path
			fill="#1D1D1D"
			stroke="#1D1D1D"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M7.824 18.932a.488.488 0 0 0 .093.707 8.553 8.553 0 1 0-3.558-5.752c.041.279.314.456.59.398a.54.54 0 0 0 .413-.609 7.53 7.53 0 1 1 3.19 5.16.54.54 0 0 0-.728.096Z"
			mask="url(#clock_svg__a)"
		/>
		<path
			stroke="#1D1D1D"
			strokeLinecap="round"
			d="m1.876 11.597 2.23 2.353a1 1 0 0 0 1.414.038l2.354-2.231M12.843 9.14v3.733a.5.5 0 0 0 .222.416l2.778 1.851"
		/>
	</svg>
);
export default SvgClock;
