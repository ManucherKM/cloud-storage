import {
	FormEmail,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'
import { FC } from 'react'

export const RestoreAccountEmail: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormEmail />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
