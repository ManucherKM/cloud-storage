import { SlidingFromLeftToRight, TrashContent } from '@/components'
import { FC } from 'react'

export const Trash: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<TrashContent />
		</SlidingFromLeftToRight>
	)
}
