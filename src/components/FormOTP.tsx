import { useStore } from '@/storage'
import clsx from 'clsx'
import { Input, Paragraph } from 'kuui-react'
import { FC, HTMLAttributes, useState } from 'react'
import { AlertError } from '.'

export type TFormOTP = HTMLAttributes<HTMLDivElement>

export interface IFormOTP extends TFormOTP {
	email: string
}

export const FormOTP: FC<IFormOTP> = ({ className, email, ...props }) => {
	const [otp, setOtp] = useState<string>('')
	const [serverError, setServerError] = useState<string>('')
	const setLoading = useStore(store => store.setLoading)

	function otpChangeHandler(val: string) {
		setOtp(val)
	}

	async function completeHandler() {
		setLoading(true)
		console.log(otp)
		setLoading(false)
	}

	function serverErrorTimeHandler() {
		setServerError('')
	}

	const styles = clsx([
		'max-w-md w-full px-2 flex flex-col gap-4 items-center',
		className,
	])

	return (
		<div className={styles} {...props}>
			<AlertError error={serverError} onTimeUp={serverErrorTimeHandler} />
			<Paragraph align="center">Enter the code sent to {email}.</Paragraph>
			<Input
				variant="OTP"
				length={6}
				value={otp}
				onChange={otpChangeHandler}
				onComplete={completeHandler}
			/>
		</div>
	)
}
