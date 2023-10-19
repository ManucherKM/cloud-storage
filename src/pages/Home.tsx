import { HomeContent, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const Home: FC = () => {
	return (
		<SlidingFromLeftToRight className="h-full">
			<HomeContent />
		</SlidingFromLeftToRight>
	)
}
