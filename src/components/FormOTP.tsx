import { ERoutes } from '@/configuration/routes'
import { useRestoreAccount, useStore } from '@/storage'
import clsx from 'clsx'
import { Input, Paragraph } from 'kuui-react'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AlertError } from '.'

export type TFormOTP = HTMLAttributes<HTMLDivElement>

export interface IFormOTP extends TFormOTP {}

export const FormOTP: FC<IFormOTP> = ({ className, ...props }) => {
	const email = useRestoreAccount(store => store.email)
	const verificationOtp = useRestoreAccount(store => store.verificationOtp)
	const [otp, setOtp] = useState<string>('')
	const [serverError, setServerError] = useState<string>('')
	const setLoading = useStore(store => store.setLoading)
	const navigate = useNavigate()

	function otpChangeHandler(val: string) {
		setOtp(val)
	}

	async function completeHandler() {
		if (!otp) {
			return
		}

		setLoading(true)

		const isSuccess = await verificationOtp(+otp)

		if (!isSuccess) {
			setServerError('Incorrect one-time code.')
			setLoading(false)
			return
		}

		navigate(ERoutes.restoreAccountPassword)
		setLoading(false)
	}

	function serverErrorTimeHandler() {
		setServerError('')
	}

	async function pasteHandler() {
		const data = await navigator.clipboard.readText()
		setOtp(data)
	}

	useEffect(() => {
		if (!email) {
			navigate(ERoutes.restoreAccountEmail)
			return
		}

		// Since we only need to check the email for emptiness on the first render, we disable eslint for this warning.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const styles = clsx([
		'max-w-md w-full px-2 flex flex-col gap-4 items-center',
		className,
	])

	return (
		<div className={styles} onPaste={pasteHandler} {...props}>
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
