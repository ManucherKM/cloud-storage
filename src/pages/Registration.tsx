// Types
import type { FC } from 'react'

// Components
import { FormRegistration, SlidingFromLeftToRight } from '@/components'

/**
 * Registration page.
 * @example <Registration />
 */
export const Registration: FC = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<SlidingFromLeftToRight>
				<FormRegistration />
			</SlidingFromLeftToRight>
		</div>
	)
}
