// Types
import type { IInputPassword as IKuuiInputPassword } from 'kuui-react'

// Components
import { Input, TextError } from 'kuui-react'

// Utils
import { forwardRef } from 'react'

/** Allowed types for `InputPassword`. */

export type TInputPassword = Omit<IKuuiInputPassword, 'fill' | 'variant'>

/** `InputPassword` component interface. */

export interface IInputPassword extends TInputPassword {
	/** Error text. */
	error?: string
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
	({ error, placeholder, ...props }, ref) => {
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
					variant="password"
					placeholder={placeholder || 'password'}
					{...props}
				/>
			</div>
		)
	},
)
