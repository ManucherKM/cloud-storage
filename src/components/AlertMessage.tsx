// Types
import type { IAlert } from 'kuui-react'
import type { FC } from 'react'

// Components
import { Alert } from 'kuui-react'

/** Valid types for `AlertMessage`. */
export type TAlertMessage = Omit<IAlert, 'text' | 'variant' | 'time'>

/** `AlertMessage` component interface. */
export interface IAlertMessage extends TAlertMessage {
	/** Message text. */
	message: string
}

/**
 * Using the `AlertMessage` component, you can show any message to the user.
 *
 * @example
 * 	const [message, setMessage] = useState('Message')
 *
 * 	return <AlertMessage message={message} onTimeUp={() => setMessage('')} />
 *
 * @param props Propses
 */
export const AlertMessage: FC<IAlertMessage> = ({ message, ...props }) => {
	return (
		<>
			{message.length !== 0 && (
				<Alert text={message} variant="message" time={4} {...props} />
			)}
		</>
	)
}
