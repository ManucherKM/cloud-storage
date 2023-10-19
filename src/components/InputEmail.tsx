import { IInputText, Input, TextError } from 'kuui-react'
import { forwardRef } from 'react'

export type TInputEmail = Omit<IInputText, 'fill' | 'variant' | 'placeholder'>

export interface IInputEmail extends TInputEmail {
	error?: string
}

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
