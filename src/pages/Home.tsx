// Types
import type { FC } from 'react'

// Components
import { HomeContent, SlidingFromLeftToRight } from '@/components'

/**
 * Home page.
 *
 * @example <Home />
 */
export const Home: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<HomeContent />
		</SlidingFromLeftToRight>
	)
}
