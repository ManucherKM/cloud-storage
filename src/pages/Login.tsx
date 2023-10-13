import { FormLogin, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const Login: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<FormLogin />
			</SlidingFromLeftToRight>
		</div>
	)
}
