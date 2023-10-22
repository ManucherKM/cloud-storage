// Types
import type { FC } from 'react'

// Components
import { SlidingFromLeftToRight, StorageContent } from '@/components'

/**
 * Storage page.
 *
 * @example
 * 	;<Storage />
 */
export const Storage: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<StorageContent />
		</SlidingFromLeftToRight>
	)
}
