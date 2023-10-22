// Types
import type { FC } from 'react'

// Components
import {
	FormEmail,
	LayoutRestoreAccount,
	SlidingFromLeftToRight,
} from '@/components'

/**
 * Account recovery email page.
 *
 * @example
 * 	;<RestoreAccountEmail />
 */
export const RestoreAccountEmail: FC = () => {
	return (
		<LayoutRestoreAccount>
			<SlidingFromLeftToRight>
				<FormEmail />
			</SlidingFromLeftToRight>
		</LayoutRestoreAccount>
	)
}
