import { Input, Paragraph } from 'kuui-react'
import { FC, HTMLAttributes, useState } from 'react'

export type TFormOTP = HTMLAttributes<HTMLDivElement>

export interface IFormOTP extends TFormOTP {
	email: string
}

export const FormOTP: FC<IFormOTP> = ({ className, email, ...props }) => {
	const [otp, setOtp] = useState<string>('')

	function otpChangeHandler(val: string) {
		setOtp(val)
	}

	return (
		<div
			className="max-w-md w-full px-2 flex flex-col gap-4 items-center"
			{...props}
		>
			<Paragraph align="center">Enter the code sent to {email}.</Paragraph>
			<Input variant="OTP" length={6} value={otp} onChange={otpChangeHandler} />
		</div>
	)
}
