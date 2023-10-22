// Types
import type { FC } from 'react'

// Components
import {
	FormOTP,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'

/**
 * Account recovery OTP page.
 *
 * @example
 * 	;<RestoreAccountOTP />
 */
export const RestoreAccountOTP: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormOTP />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
