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
import { useEffectSkipFirstRender, useLoader } from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { validateEmail, validatePassword } from '@/utils'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import { GoogleAuth, VKAuth } from '@/components'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button, Form, Link, Paragraph, Title } from 'kuui-react'
import { InputEmail } from './InputEmail'
import { InputPassword } from './InputPassword'

// Site key for correct work with hCaptcha.
const HCAPTCHA_SITEKEY = env.get('HCAPTCHA_SITEKEY').required().asString()

/** Interface for the authorization form. */
export interface ILoginForm {
	/** Email value */
	email: string

	/** Password value */
	password: string

	/** Token value */
	token: string
}

/** The default value for the authorization form. */
const defaultForm: ILoginForm = {
	email: '',
	password: '',
	token: '',
}

/** `FormLogin` component interface. */
export interface IFormLogin extends HTMLAttributes<HTMLDivElement> {}

/**
 * User Authorization Form.
 *
 * @example
 * 	;<FormLogin />
 */
export const FormLogin = forwardRef<HTMLDivElement, IFormLogin>(
	({ className, ...props }, ref) => {
		// The state for the user's form.
		const [form, setForm] = useState<ILoginForm>(defaultForm)

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

		// A function for showing Loader to the user when requesting an API.
		const loader = useLoader()

		// With this feature, you can redirect the user to another route.
		const navigate = useNavigate()

		// You can use this function to send user data for authorization.
		const login = useAuthStore(store => store.login)

		// A reference to `inputEmail` in the DOM.
		const inputEmail = useRef<HTMLInputElement | null>(null)

		// A reference to `inputPassword` in the DOM.
		const inputPassword = useRef<HTMLInputElement | null>(null)

		// Link to the HCaptcha component in the DOM.
		const hCaptchaRef = useRef<HCaptcha | null>(null)

		// Function to send a request to the API.
		async function sendToApi() {
			// Check the validity of the form.
			if (!isValid) {
				// Stop further execution of the function.
				return
			}

			// We get the results of the request.
			const isLogin = await loader(login, form)

			// If authorization failed.
			if (!isLogin) {
				// Show the user an error message.
				newError('Incorrect login or password.')

				// Reset the captcha.
				hCaptchaRef.current?.resetCaptcha()

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the storage page.
			navigate(ERoutes.storage)

			// Clearing the form.
			setForm(defaultForm)
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
					// send a request to the API.
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

			// send a request to the API.
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

		// Call the callback function every time email changes.
		useEffectSkipFirstRender(() => {
			// The result of validating the user's email.
			const isValid = validateEmail(form.email)

			// Changing the validity state.
			setIsEmailValid(isValid)
		}, [form.email])

		// Call the callback function every time password changes.
		useEffectSkipFirstRender(() => {
			// The result of validating the user's password.
			const isValid = validatePassword(form.password)

			// Changing the validity state.
			setIsPasswordValid(isValid)
		}, [form.password])

		// Call the callback function every time hCaptcha token changes.
		useEffectSkipFirstRender(() => {
			// The result of validating the token.
			const isValid = !!form.token

			// Changing the validity state.
			setIsTokenValid(isValid)
		}, [form.token])

		// When changing the form validation values, we change the overall form validation value.
		useEffect(() => {
			// Form Validation.
			const isValid = isEmailValid && isPasswordValid && isTokenValid

			// Change the isValid state.
			setIsValid(isValid)
		}, [isEmailValid, isPasswordValid, isTokenValid])

		// When rendering, we focus on input.
		useEffect(() => {
			inputEmail.current?.focus()
		}, [])

		// Root block styles
		const styles = clsx(['max-w-xs w-full px-2', className])

		return (
			<div ref={ref} className={styles} {...props}>
				<Title className="mb-5" align="center">
					Authorization
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

					<Link
						to={ERoutes.restoreAccountEmail}
						align="right"
						dimension="extraSmall"
					>
						Forgot your password?
					</Link>

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

					<GoogleAuth logics="login" variant="large" fill="all" />
					<VKAuth logics="login" variant="large" fill="all" />

					<Paragraph variant="passive" align="center">
						New user?{' '}
						<Link to={ERoutes.registration} align="center">
							Registration
						</Link>
					</Paragraph>
				</Form>
			</div>
		)
	},
)
