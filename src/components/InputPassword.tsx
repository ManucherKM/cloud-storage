import { Input, TextError } from 'kuui-react'
import { IInputPassword as IKuuiInputPassword } from 'kuui-react/dist/ui/Input/Input'
import { forwardRef } from 'react'

export type TInputPassword = Omit<
	IKuuiInputPassword,
	'fill' | 'variant' | 'placeholder'
>

export interface IInputPassword extends TInputPassword {
	error?: string
}

export const InputPassword = forwardRef<HTMLInputElement, IInputPassword>(
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
					variant="password"
					placeholder="password"
					{...props}
				/>
			</div>
		)
	},
)
