import { CheckMark } from '@/assets/icons'
import { Paragraph } from 'kuui-react'
import { FC } from 'react'

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
