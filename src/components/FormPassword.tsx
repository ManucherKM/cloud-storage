// Types
import type {
	ChangeEvent,
	FC,
	FormEvent,
	HTMLAttributes,
	KeyboardEvent,
} from 'react'

// Utils
import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useNotificationsStore, useRestoreAccount } from '@/storage'
import { validatePassword } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import clsx from 'clsx'
import { Button, Form, Paragraph } from 'kuui-react'
import { InputPassword } from './InputPassword'

/** Valid types for `FormPassword` */
export type TFormPassword = HTMLAttributes<HTMLDivElement>

/** `FormPassword` component interface. */
export interface IFormPassword extends TFormPassword {}

/** `FormPassword` component password form. */
export interface IPasswords {
	/** Password text. */
	password: string

	/** Password confirmation text */
	confirmPassword: string
}

// Default passwords form.
const defaultPasswords: IPasswords = {
	password: '',
	confirmPassword: '',
}

/**
 * Form for changing the user password.
 *
 * @example
 * 	;<FormPassword />
 *
 * @param props Propses
 */
export const FormPassword: FC<IFormPassword> = ({ className, ...props }) => {
	// Function for requesting an API to change the password.
	const changePassword = useRestoreAccount(store => store.changePassword)

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// State for the form with passwords.
	const [passwords, setPasswords] = useState<IPasswords>(defaultPasswords)

	// State for passwords validity.
	const [isValidPasswords, setIsValidPasswords] = useState<boolean>(false)

	// State for password validity.
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false)

	// State for the validity of identical passwords.
	const [isPasswordsSame, setIsPasswordsSame] = useState<boolean>(false)

	// State for confirm password validity.
	const [isValidConfirmPassword, setIsValidConfirmPassword] =
		useState<boolean>(false)

	// State for confirm password errors.
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

	// Path to the InputPassword component in DOM.
	const inputPassword = useRef<HTMLInputElement | null>(null)

	// Path to the InputConfirmPassword component in DOM.
	const inputConfirmPassword = useRef<HTMLInputElement | null>(null)

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Function to redirect the user.
	const navigate = useNavigate()

	// Function to send a request to the API.
	async function sendToApi() {
		// If the passwords are not valid, we prevent further execution of the function.
		if (!isValidPasswords) return

		// We get the result of the API request.
		const isSuccess = await loader(changePassword, passwords.password)

		// If the request was unsuccessful.
		if (!isSuccess) {
			// Show the user the error text.
			newError('Failed to change password.')

			// We prevent further execution of the function
			return
		}

		// Redirecting the user to the authorization page.
		navigate(ERoutes.login)
	}

	// A function that will be executed when submitting a form using a button.
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the browser.
		e.preventDefault()

		// Send the request to API.
		await sendToApi()
	}

	// A function that will be executed when the password input value changes.
	function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
		// We change the state.
		setPasswords(prev => ({
			...prev,
			password: e.target.value,
		}))
	}

	// A function that will be executed when the Enter button is pressed while focusing on an input with a password.
	function passwordKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') {
			// We focus on the password confirmation input.
			inputConfirmPassword.current?.focus()
		}
	}

	// The function that will be executed when the Enter button is pressed while focusing on the password confirmation input.
	async function confirmPasswordKeyDownHandler(
		e: KeyboardEvent<HTMLInputElement>,
	) {
		if (e.code === 'Enter') {
			// We remove the focus from the password confirmation input.
			inputConfirmPassword.current?.blur()

			// We send a request to API.
			await sendToApi()
		}
	}

	// A handler function that will be processed when the input to confirm the password is changed.
	function confirmPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
		// We change the state.
		setPasswords(prev => ({
			...prev,
			confirmPassword: e.target.value,
		}))
	}

	// When the password changes, we call the callback.
	useEffect(() => {
		// Password validation result.
		const isValid = validatePassword(passwords.password)

		// We change the validity state.
		setIsValidPassword(isValid)
	}, [passwords.password])

	// When changing the password, we call a callback to confirm.
	useEffect(() => {
		// Password validation result.
		const isValid = validatePassword(passwords.confirmPassword)

		// We change the validity state.
		setIsValidConfirmPassword(isValid)
	}, [passwords.confirmPassword])

	// When changing the form with passwords, we call the callback.
	useEffect(() => {
		// If any of the passwords are not valid.
		if (!isValidPassword || !isValidConfirmPassword) {
			// Prevent further execution of the function.
			return
		}

		// Passwords validation result.
		const isValid = passwords.password === passwords.confirmPassword

		// We change the validity state.
		setIsPasswordsSame(isValid)
	}, [passwords, isValidPassword, isValidConfirmPassword])

	useEffect(() => {
		if (!isPasswordsSame && isValidPassword && isValidConfirmPassword) {
			setConfirmPasswordError('Passwords must be the same.')
		} else {
			setConfirmPasswordError('')
		}

		const isValid = isPasswordsSame && isValidPassword && isValidConfirmPassword

		setIsValidPasswords(isValid)
	}, [isValidPassword, isValidConfirmPassword, isPasswordsSame])

	// During the first render, we focus on the password input.
	useEffect(() => {
		inputPassword.current?.focus()
	}, [])

	// Styles for root block
	const styles = clsx(['max-w-xs w-full px-2', className])
	return (
		<div className={styles} {...props}>
			<Paragraph className="mb-4" align="center">
				Enter a new password.
			</Paragraph>
			<Form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
				<InputPassword
					ref={inputPassword}
					onKeyDown={passwordKeyDownHandler}
					value={passwords.password}
					onChange={passwordHandler}
				/>
				<InputPassword
					ref={inputConfirmPassword}
					onKeyDown={confirmPasswordKeyDownHandler}
					customError={confirmPasswordError}
					value={passwords.confirmPassword}
					onChange={confirmPasswordHandler}
					placeholder="confirm password"
				/>
				<Button variant="active" type="submit" disabled={!isValidPasswords}>
					Submit
				</Button>
			</Form>
		</div>
	)
}
