import {
	IInputPassword as IKuuiInputPassword,
	Input,
	TextError,
} from 'kuui-react'
import { forwardRef } from 'react'

export type TInputPassword = Omit<IKuuiInputPassword, 'fill' | 'variant'>

export interface IInputPassword extends TInputPassword {
	error?: string
}

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
