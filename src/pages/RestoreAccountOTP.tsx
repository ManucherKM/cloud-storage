import {
	FormOTP,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'
import { FC } from 'react'

export const RestoreAccountOTP: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormOTP />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
