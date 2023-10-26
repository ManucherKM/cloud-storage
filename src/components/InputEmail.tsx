// Types
import type { IInputText } from 'kuui-react'
import type { ChangeEvent } from 'react'

// Utils
import { validateEmail } from '@/utils'
import { Input, TextError } from 'kuui-react'
import { forwardRef, useState } from 'react'

/** Allowed types for `InputEmail`. */
export type TInputEmail = Omit<IInputText, 'fill' | 'variant' | 'placeholder'>

/** `InputEmail` component interface. */
export interface IInputEmail extends TInputEmail {}

/**
 * Component for receiving user's e-mail.
 *
 * @example
 * 	const [email, setEmail] = useState('')
 *
 * 	function changeHandler() {
 * 		// ...other code
 * 	}
 * 	return <InputEmail value={email} onChange={changeHandler} />
 */
export const InputEmail = forwardRef<HTMLInputElement, IInputEmail>(
	({ onChange, ...props }, ref) => {
		// State for error text.
		const [error, setError] = useState<string>('')

		// A handler function that will be processed every time the Input changes.
		function changeHandler(e: ChangeEvent<HTMLInputElement>) {
			// Check email validity.
			const isValid = validateEmail(e.target.value)

			// If email is valid, clear the error state.
			if (isValid) {
				setError('')
			}

			// Otherwise, we add the error text to the "error" state.
			else {
				setError('Enter a valid email')
			}

			// If the developer indicated onChange.
			if (onChange) {
				// Let's call this function.
				onChange(e)
			}
		}

		return (
			<div className="w-full h-min">
				{error && (
					<TextError dimension="small" className="text-justify mb-3">
						{error}
					</TextError>
				)}
				<Input
					ref={ref}
					fill="all"
					variant="text"
					placeholder="email"
					onChange={changeHandler}
					{...props}
				/>
			</div>
		)
	},
)
