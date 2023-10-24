import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useNotificationsStore, useRestoreAccount } from '@/storage'
import { validatePassword } from '@/utils'
import { Button, Form, Paragraph } from 'kuui-react'
import {
	ChangeEvent,
	FC,
	FormEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useNavigate } from 'react-router'
import { InputPassword } from '.'

export interface IFormPassword {}

export interface IPasswordsErrors {
	password: string
	confirmPassword: string
}

const defaultPasswordsErrors: IPasswordsErrors = {
	password: '',
	confirmPassword: '',
}

export interface IPasswords {
	password: string
	confirmPassword: string
}

const defaultPasswords: IPasswords = {
	password: '',
	confirmPassword: '',
}

export const FormPassword: FC<IFormPassword> = () => {
	const changePassword = useRestoreAccount(store => store.changePassword)
	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)
	const [passwords, setPasswords] = useState<IPasswords>(defaultPasswords)
	const [isValidPasswords, setIsValidPasswords] = useState<boolean>(false)
	const [passwordsErrors, setPasswordsErrors] = useState<IPasswordsErrors>(
		defaultPasswordsErrors,
	)
	const inputPassword = useRef<HTMLInputElement>(null)
	const inputConfirmPassword = useRef<HTMLInputElement>(null)
	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()
	const navigate = useNavigate()

	async function sendToApi() {
		if (!isValidPasswords) {
			return
		}

		const isSuccess = await loader(changePassword, passwords.password)

		if (!isSuccess) {
			newError('Failed to change password.')
			return
		}

		navigate(ERoutes.login)
	}

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await sendToApi()
	}

	function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
		const isValid = validatePassword(e.target.value)

		if (isValid) {
			setPasswordsErrors(prev => ({ ...prev, password: '' }))
		} else {
			setPasswordsErrors(prev => ({
				...prev,
				password:
					'The password must be no less than 8 characters and no more than 32 characters, contain at least one special character, one uppercase letter and one lowercase letter. ',
			}))
		}

		setPasswords(prev => ({
			...prev,
			password: e.target.value,
		}))
	}

	function passwordKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') {
			inputConfirmPassword.current?.focus()
		}
	}

	async function confirmPasswordKeyDownHandler(
		e: KeyboardEvent<HTMLInputElement>,
	) {
		if (e.code === 'Enter') {
			inputConfirmPassword.current?.blur()
			await sendToApi()
		}
	}

	function confirmPasswordHandler(e: ChangeEvent<HTMLInputElement>) {
		const isValid = validatePassword(e.target.value)

		const messageError =
			'The password must be no less than 8 characters and no more than 32 characters, contain at least one special character, one uppercase letter and one lowercase letter. '

		const isCurrentError = passwordsErrors.confirmPassword === messageError

		if (isValid && isCurrentError) {
			setPasswordsErrors(prev => ({ ...prev, confirmPassword: '' }))
		} else if (!isValid) {
			setPasswordsErrors(prev => ({
				...prev,
				confirmPassword: messageError,
			}))
		}

		setPasswords(prev => ({
			...prev,
			confirmPassword: e.target.value,
		}))
	}

	useEffect(() => {
		const isPasswordValid = validatePassword(passwords.password)
		const isConfirmPasswordValid = validatePassword(passwords.confirmPassword)

		const isPasswordsValid = isPasswordValid && isConfirmPasswordValid

		const isPasswordsSame = passwords.password === passwords.confirmPassword

		const isValid = isPasswordsValid && isPasswordsSame

		if (isPasswordsValid && !isPasswordsSame) {
			setPasswordsErrors(prev => ({
				...prev,
				confirmPassword: 'Passwords must be the same.',
			}))
		} else if (isValid) {
			setPasswordsErrors(prev => ({
				...prev,
				confirmPassword: '',
			}))
		}

		setIsValidPasswords(isValid)
	}, [passwords])

	useEffect(() => {
		inputPassword.current?.focus()
	}, [])
	return (
		<div className="max-w-xs w-full px-2">
			<Paragraph className="mb-4" align="center">
				Enter a new password.
			</Paragraph>
			<Form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
				<InputPassword
					ref={inputPassword}
					onKeyDown={passwordKeyDownHandler}
					error={passwordsErrors.password}
					value={passwords.password}
					onChange={passwordHandler}
				/>
				<InputPassword
					ref={inputConfirmPassword}
					onKeyDown={confirmPasswordKeyDownHandler}
					error={passwordsErrors.confirmPassword}
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
