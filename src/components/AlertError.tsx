// Types
import type { IAlert } from 'kuui-react'
import type { FC } from 'react'

// Components
import { Alert } from 'kuui-react'

/** Valid types for `AlertError`. */
export type TAlertError = Omit<IAlert, 'text' | 'variant' | 'time'>

/** `AlertError` component interface. */
export interface IAlertError extends TAlertError {
	/** Error text. */
	error: string
}

/**
 * Using the `AlertError` component, you can show any error to the user.
 *
 * @example
 * 	const [error, setError] = useState('Error')
 *
 * 	return <AlertError error={error} onTimeUp={() => setError('')} />
 *
 * @param props Propses
 */
export const AlertError: FC<IAlertError> = ({ error, ...props }) => {
	return (
		<>
			{error.length !== 0 && (
				<Alert text={error} variant="error" time={4} {...props} />
			)}
		</>
	)
}
