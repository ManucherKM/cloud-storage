import { FC } from 'react'

export const Logo: FC = () => {
	return (
		<svg width="50" height="50" viewBox="0 0 120 120" fill="none">
			<rect width="120" height="120" rx="60" fill="url(#paint0_linear_9_12)" />
			<rect x="3" y="3" width="114" height="114" rx="57" fill="black" />
			<path
				d="M31.5506 70V40.16H31.5906L46.7506 61.68L45.1106 61.36L60.2306 40.16H60.3106V70H56.4706V48.96L56.7106 50.92L45.7906 66.36H45.7106L34.6306 50.92L35.3106 49.12V70H31.5506ZM72.5409 52.72L72.4209 54.16L72.9409 53.44L84.7809 41.08H89.7809L77.8209 53.48L90.4609 70H85.5409L74.9809 55.96L72.5409 58.32V70H68.6209V41.08H72.5409V52.72Z"
				fill="white"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_9_12"
					x1="-1.54475e-06"
					y1="60"
					x2="120"
					y2="60"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#CF2929" stopOpacity="0.9" />
					<stop offset="0.317708" stopColor="#E77B59" stopOpacity="0.9" />
					<stop offset="0.317808" stopColor="#FF6B00" stopOpacity="0.9" />
					<stop offset="0.651042" stopColor="#DCED76" stopOpacity="0.9" />
					<stop offset="1" stopColor="#12F5F5" />
					<stop offset="1" stopColor="#12F5F5" stopOpacity="0.9" />
				</linearGradient>
			</defs>
		</svg>
	)
}
