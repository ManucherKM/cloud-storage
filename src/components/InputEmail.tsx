// Types
import type { IInputText } from 'kuui-react'

// Utils
import { Input, TextError } from 'kuui-react'
import { forwardRef } from 'react'

/** Allowed types for `InputEmail`. */
export type TInputEmail = Omit<IInputText, 'fill' | 'variant' | 'placeholder'>

/** `InputEmail` component interface. */
export interface IInputEmail extends TInputEmail {
	/** Error text. */
	error?: string
}

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
	({ error, ...props }, ref) => {
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
					{...props}
				/>
			</div>
		)
	},
)
