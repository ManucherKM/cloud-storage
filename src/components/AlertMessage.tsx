import { Alert } from 'kuui-react'
import { IAlert } from 'kuui-react/dist/components/Alert/Alert'
import { FC } from 'react'

export type TAlertMessage = Omit<IAlert, 'text' | 'variant' | 'time'>

export interface IAlertMessage extends TAlertMessage {
	message: string
}

export const AlertMessage: FC<IAlertMessage> = ({ message, ...props }) => {
	return (
		<>
			{message.length !== 0 && (
				<Alert text={message} variant="message" time={6} {...props} />
			)}
		</>
	)
}
