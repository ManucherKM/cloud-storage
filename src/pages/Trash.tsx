// Types
import type { FC } from 'react'

// Components
import { SlidingFromLeftToRight, TrashContent } from '@/components'

/**
 * Trash page.
 *
 * @example <Trash />
 */
export const Trash: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<TrashContent />
		</SlidingFromLeftToRight>
	)
}
