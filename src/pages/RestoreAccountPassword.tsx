import {
	FormPassword,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'
import { FC } from 'react'

export const RestoreAccountPassword: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormPassword />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
