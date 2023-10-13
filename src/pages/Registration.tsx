import { FormRegistration, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const Registration: FC = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<SlidingFromLeftToRight>
				<FormRegistration />
			</SlidingFromLeftToRight>
		</div>
	)
}
