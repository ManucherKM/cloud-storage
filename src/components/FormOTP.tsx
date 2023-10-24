import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useNotificationsStore, useRestoreAccount } from '@/storage'
import clsx from 'clsx'
import { Input, Paragraph } from 'kuui-react'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export type TFormOTP = HTMLAttributes<HTMLDivElement>

export interface IFormOTP extends TFormOTP {}

export const FormOTP: FC<IFormOTP> = ({ className, ...props }) => {
	const email = useRestoreAccount(store => store.email)
	const verificationOtp = useRestoreAccount(store => store.verificationOtp)
	const [otp, setOtp] = useState<string>('')

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()
	const navigate = useNavigate()

	function otpChangeHandler(val: string) {
		setOtp(val)
	}

	async function completeHandler() {
		if (!otp) {
			return
		}

		const isSuccess = await loader(verificationOtp, +otp)

		if (!isSuccess) {
			newError('Incorrect one-time code.')

			return
		}

		navigate(ERoutes.restoreAccountPassword)
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
