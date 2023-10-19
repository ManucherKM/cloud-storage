import { AccountConfirmContent, SlidingFromLeftToRight } from '@/components'
import { FC } from 'react'

export const AccountConfirm: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<AccountConfirmContent />
			</SlidingFromLeftToRight>
		</div>
	)
}
