// Types
import type { FC } from 'react'

// Components
import { AccountConfirmContent, SlidingFromLeftToRight } from '@/components'

/**
 * Page for a verified user account.
 *
 * @example <AccountConfirm />
 */
export const AccountConfirm: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<SlidingFromLeftToRight>
				<AccountConfirmContent />
			</SlidingFromLeftToRight>
		</div>
	)
}
