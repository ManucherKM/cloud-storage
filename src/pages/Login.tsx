// Types
import type { FC } from 'react'

// Components
import { FormLogin, SlidingFromLeftToRight } from '@/components'

/**
 * Login page.
 *
 * @example
 * 	;<Login />
 */
export const Login: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<FormLogin />
			</SlidingFromLeftToRight>
		</div>
	)
}
