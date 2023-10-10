import { Alert } from 'kuui-react'
import { IAlert } from 'kuui-react/dist/components/Alert/Alert'
import { FC } from 'react'

export type TAlertError = Omit<IAlert, 'text' | 'variant' | 'time'>

export interface IAlertError extends TAlertError {
	error: string
}

export const AlertError: FC<IAlertError> = ({ error, ...props }) => {
	return (
		<>
			{error.length !== 0 && (
				<Alert text={error} variant="error" time={6} {...props} />
			)}
		</>
	)
}
