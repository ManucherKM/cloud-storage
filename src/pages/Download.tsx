import { DownloadContent, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const Download: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<DownloadContent />
			</SlidingFromLeftToRight>
		</div>
	)
}
