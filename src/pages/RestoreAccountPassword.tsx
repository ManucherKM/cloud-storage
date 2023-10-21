// Types
import type { FC } from 'react'

// Components
import {
	FormPassword,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'

/**
 * Account recovery password page.
 *
 * @example <RestoreAccountPassword />
 */
export const RestoreAccountPassword: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormPassword />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
