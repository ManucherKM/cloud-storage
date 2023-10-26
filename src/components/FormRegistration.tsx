// Types
import type {
	ChangeEvent,
	FormEvent,
	HTMLAttributes,
	KeyboardEvent,
} from 'react'

// Utils
import { env } from '@/configuration/env'
import { ERoutes } from '@/configuration/routes'
import { useLoader } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { validateEmail, validatePassword } from '@/utils'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import { GoogleAuth } from '@/components'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button, ConfirmEmail, Form, Link, Paragraph, Title } from 'kuui-react'
import { InputEmail } from './InputEmail'
import { InputPassword } from './InputPassword'
import { VKAuth } from './VKAuth/VKAuth'

// Site key for correct work with hCaptcha.
const HCAPTCHA_SITEKEY = env.get('HCAPTCHA_SITEKEY').required().asString()

/** Interface for the enrollment form. */
export interface IRegistrationForm {
	/** Email. */
	email: string

	/** Password. */
	password: string

	/** HCaptcha token. */
	token: string
}

// The default value for the enrollment form.
const defaultForm: IRegistrationForm = {
	email: '',
	password: '',
	token: '',
}

/** `FormRegistration` component interface. */
export interface IFormRegistration extends HTMLAttributes<HTMLDivElement> {}

/**
 * Component for user registration.
 *
 * @example
 * 	;<FormRegistration />
 *
 * @param props Propses
 */
export const FormRegistration = forwardRef<HTMLDivElement, IFormRegistration>(
	({ className, ...props }, ref) => {
		// The state for the user's form.
		const [form, setForm] = useState<IRegistrationForm>(defaultForm)

		// The state for rendering the "ConfirmEmail" component.
		const [confirmEmail, setConfirmEmail] = useState<boolean>(false)

		// Function to create a new error to show it to the user.
		const newError = useNotificationsStore(store => store.newError)

		// Form validity state.
		const [isValid, setIsValid] = useState<boolean>(false)

		// State for email validity.
		const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

		// State for password validity.
		const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

		// State for token validity.
		const [isTokenValid, setIsTokenValid] = useState<boolean>(false)

		// With this feature, you can redirect the user to another route.
		const navigate = useNavigate()

		// You can use this function to send user data for registration.
		const registration = useAuthStore(store => store.registration)

		// A function for showing Loader to the user when requesting an API.
		const loader = useLoader()

		// A reference to "inputEmail" in the DOM.
		const inputEmail = useRef<HTMLInputElement | null>(null)

		// A reference to "inputPassword" in the DOM.
		const inputPassword = useRef<HTMLInputElement | null>(null)

		// A reference to the HCaptcha component in the DOM.
		const hCaptchaRef = useRef<HCaptcha>(null)

		// Function to send a request to the API.
		async function sendToApi() {
			// Check to see if the form submit button is disabled.
			if (!isValid) {
				// Stop further execution of the function.
				return
			}

			const isRegistered = await loader(registration, form)

			// If registration failed.
			if (!isRegistered) {
				// Clearing the form.
				setForm(defaultForm)

				newError('Failed to register.')

				// Reset the captcha.
				hCaptchaRef.current?.resetCaptcha()

				// Stop further execution of the function.
				return
			}

			// Change the state of confirmEmail.
			setConfirmEmail(true)
		}

		// Handler function to focus on `inputPassword` when the "Enter" key is pressed in `inputEmail`.
		function emailKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
			// If the key pressed is "Enter".
			if (e.code === 'Enter') {
				// Focus on inputPassword.
				inputPassword.current?.focus()
			}
		}

		// Handler function for pressing the Enter key when the focus is on inputPassword.
		async function passwordKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
			// If the key pressed is "Enter".
			if (e.code === 'Enter') {
				// If the hCaptcha token exists.
				if (form.token) {
					// Send the request to API.
					await sendToApi()
				} else {
					// Otherwise, take the focus away from inputPassword.
					inputPassword.current?.blur()
				}
			}
		}

		// A handler function for submitting a form.
		async function submitHandler(e: FormEvent<HTMLFormElement>) {
			// We prevent the default browser behavior so that the form is not submitted.
			e.preventDefault()

			// Send the request to API.
			await sendToApi()
		}

		// Handler function to retrieve the user's email.
		function emailHandler(e: ChangeEvent<HTMLInputElement>) {
			// We add the email specified by the user to the form object.
			setForm(prev => ({ ...prev, email: e.target.value }))
		}

		// Handler function to retrieve the user's password.
		function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
			// We add the password specified by the user to the form object.
			setForm(prev => ({ ...prev, password: e.target.value }))
		}

		// A handler function to retrieve solved captcha data.
		function hCaptchaVerifyHandler(token: string) {
			// Add the resulting token to the form object.
			setForm(prev => ({ ...prev, token }))
		}

		// Handler function to delete a token when it expires.
		function hCaptchaExpireHandler() {
			// Delete the old token in the form object.
			setForm(prev => ({ ...prev, token: '' }))
		}

		// Each time the email changes, a callback is called.
		useEffect(() => {
			// Validation result.
			const isValid = validateEmail(form.email)

			// We change the state.
			setIsEmailValid(isValid)
		}, [form.email])

		// Each time the password changes, a callback is called.
		useEffect(() => {
			// Validation result.
			const isValid = validatePassword(form.password)

			// We change the state.
			setIsPasswordValid(isValid)
		}, [form.password])

		// Each time the hCaptcha token changes, a callback is called.
		useEffect(() => {
			// Validation result.
			const isValid = !!form.token

			// We change the state.
			setIsTokenValid(isValid)
		}, [form.token])

		// We call the callback whenever the form's validity values change.
		useEffect(() => {
			// Validation result.
			const isValid = isPasswordValid && isEmailValid && isTokenValid

			// We change the state.
			setIsValid(isValid)
		}, [isEmailValid, isPasswordValid, isTokenValid])

		// When rendering, we focus on input.
		useEffect(() => {
			inputEmail.current?.focus()
		}, [])

		// If the user needs to verify their account.
		if (confirmEmail) {
			// Delay for redirecting the user to the login page after he has read the displayed text.
			setTimeout(() => {
				// We redirect the user to the authorization page.
				navigate(ERoutes.login)
			}, 1000 * 10) // 10 sec

			return <ConfirmEmail email={form.email} />
		}

		// Styles for root block
		const styles = clsx(['max-w-xs w-full px-2', className])

		return (
			<div ref={ref} className={styles} {...props}>
				<Title className="mb-5" align="center">
					Registration
				</Title>
				<Form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
					<InputEmail
						ref={inputEmail}
						value={form.email}
						onChange={emailHandler}
						onKeyDown={emailKeyDownHandler}
					/>
					<InputPassword
						ref={inputPassword}
						value={form.password}
						onChange={passwordHandler}
						onKeyDown={passwordKeyDownHandler}
					/>

					<HCaptcha
						ref={hCaptchaRef}
						theme="dark"
						sitekey={HCAPTCHA_SITEKEY}
						onVerify={hCaptchaVerifyHandler}
						onExpire={hCaptchaExpireHandler}
					/>

					<Button disabled={!isValid} variant="active" type="submit">
						Submit
					</Button>

					<div className="w-full h-[1px] bg-black-500" />

					<GoogleAuth logics="registration" variant="large" fill="all" />
					<VKAuth logics="registration" variant="large" fill="all" />

					<Paragraph variant="passive" align="center">
						Already have an account?{' '}
						<Link to={ERoutes.login} align="center">
							Login
						</Link>
					</Paragraph>
				</Form>
			</div>
		)
	},
)
