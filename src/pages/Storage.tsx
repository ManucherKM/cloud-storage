import { SlidingFromLeftToRight, StorageContent } from '@/components'
import { FC } from 'react'

export const Storage: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<StorageContent />
		</SlidingFromLeftToRight>
	)
}
