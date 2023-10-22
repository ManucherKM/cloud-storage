// Types
import type { FC } from 'react'

// Icons
import { CheckMark } from '@/assets/icons'

// Components
import { Paragraph } from 'kuui-react'

/**
 * Component with the content of the page when the user confirms his account.
 *
 * @example
 * 	;<AccountConfirmContent />
 */
export const AccountConfirmContent: FC = () => {
	return (
		<div className="max-w-sm p-5 flex flex-col items-center gap-3">
			<CheckMark />
			<Paragraph align="center">
				Your account has been successfully verified! You can close this tab.
				Thank you for using our service!
			</Paragraph>
		</div>
	)
}
