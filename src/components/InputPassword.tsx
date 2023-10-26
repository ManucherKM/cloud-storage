// Types
import type { IInputPassword as IKuuiInputPassword } from 'kuui-react'
import type { ChangeEvent } from 'react'

// Components
import { Input, TextError } from 'kuui-react'

// Utils
import { validatePassword } from '@/utils'
import { forwardRef, useState } from 'react'

/** Allowed types for `InputPassword`. */
export type TInputPassword = Omit<IKuuiInputPassword, 'fill' | 'variant'>

/** `InputPassword` component interface. */
export interface IInputPassword extends TInputPassword {
	/** Custom errror text. */
	customError?: string
}

/**
 * Component for receiving user's password.
 *
 * @example
 * 	const [password, setPassword] = useState('')
 *
 * 	function changeHandler() {
 * 		// ...other code
 * 	}
 * 	return <InputPassword value={password} onChange={changeHandler} />
 */
export const InputPassword = forwardRef<HTMLInputElement, IInputPassword>(
	({ customError, onChange, placeholder, ...props }, ref) => {
		// State for error text.
		const [error, setError] = useState<string>('')

		// A handler function that will be processed every time the Input changes.
		function changeHandler(e: ChangeEvent<HTMLInputElement>) {
			// Check password validity.
			const isValid = validatePassword(e.target.value)

			// If password is valid, clear the error state.
			if (isValid) {
				setError('')
			}

			// Otherwise, we add the error text to the "error" state.
			else {
				setError(
					'The password must be no less than 8 characters and no more than 32 characters, contain at least one special character, one uppercase letter and one lowercase letter. ',
				)
			}

			// If the developer indicated onChange.
			if (onChange) {
				// Let's call this function.
				onChange(e)
			}
		}

		return (
			<div className="w-full h-min">
				{(error || customError) && (
					<TextError dimension="small" className="text-justify mb-3">
						{error || customError}
					</TextError>
				)}
				<Input
					ref={ref}
					fill="all"
					variant="password"
					placeholder={placeholder || 'password'}
					onChange={changeHandler}
					{...props}
				/>
			</div>
		)
	},
)
