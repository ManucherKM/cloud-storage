// Types
import type { FC, HTMLAttributes } from 'react'

// Utils
import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useNotificationsStore, useRestoreAccount } from '@/storage'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import { Input, Paragraph } from 'kuui-react'

/** Valid types for `FormOTP` */
export type TFormOTP = HTMLAttributes<HTMLDivElement>

/** `FormOTP` component interface. */
export interface IFormOTP extends TFormOTP {}

/**
 * Component for using one-time password.
 *
 * @param props Propses
 */
export const FormOTP: FC<IFormOTP> = ({ className, ...props }) => {
	// Email that the user entered last time.
	const email = useRestoreAccount(store => store.email)

	// Function for requesting an API to send a one-time password.
	const verificationOtp = useRestoreAccount(store => store.verificationOtp)

	// State for one-time password.
	const [otp, setOtp] = useState<string>('')

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Function to redirect the user.
	const navigate = useNavigate()

	// Handler function for changing otp.
	function otpChangeHandler(val: string) {
		// Changing the state of the otp.
		setOtp(val)
	}

	// A function that will be executed when the otp value is filled in by the user.
	async function completeHandler() {
		// If there is no one-time password. Prevent further execution of the function.
		if (!otp) return

		// We get the result of the request.
		const isSuccess = await loader(verificationOtp, +otp)

		// If the request was unsuccessful.
		if (!isSuccess) {
			// Show the user the error text.
			newError('Incorrect one-time code.')

			// Prevent further execution of the function.
			return
		}

		// We redirect the user to the password change page.
		navigate(ERoutes.restoreAccountPassword)
	}

	// A handler function that will be processed when the user inserts text (copied code).
	async function pasteHandler() {
		// Reading text from the user's buffer.
		const data = await navigator.clipboard.readText()

		// Place the copied text in the sent state.
		setOtp(data)
	}

	// We call coback on the first render.
	useEffect(() => {
		// If the email does not exist.
		if (!email) {
			// We redirect the user to the account recovery page.
			navigate(ERoutes.restoreAccountEmail)
		}

		// Since we only need to check the email for emptiness on the first render, we disable eslint for this warning.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Styles for root block.
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
