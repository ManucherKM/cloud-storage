// Types
import type { FC } from 'react'

// Components
import { DownloadContent, SlidingFromLeftToRight } from '@/components'

/**
 * Page for downloading files shared by the user.
 *
 * @example
 * 	;<Download />
 */
export const Download: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<DownloadContent />
			</SlidingFromLeftToRight>
		</div>
	)
}
