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
import {
	redirectToVkAuthPage,
	useEffectSkipFirstRender,
	useLoader,
	useVKAuth,
} from '@/hooks'
import { useAuthStore, useNotificationsStore } from '@/storage'
import { validateEmail, validatePassword } from '@/utils'
import { useGoogleLogin } from '@react-oauth/google'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {
	Button,
	Form,
	GoogleAuth,
	Link,
	Paragraph,
	Title,
	VKAuth,
} from 'kuui-react'
import { InputEmail } from './InputEmail'
import { InputPassword } from './InputPassword'

/** Site key for correct work with hCaptcha. */
const HCAPTCHA_SITEKEY = env.get('HCAPTCHA_SITEKEY').required().asString()

/** VK client ID for correct work with the API. */
const VK_CLIENT_ID = env.get('VK_CLIENT_ID').required().asString()

/** The URL where the web application is hosted. */
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

/** The URI that was used during registration. */
const vkRedirectUri = CLIENT_URL + ERoutes.login

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

/** Form interface with authorization errors. */
export interface ILoginFormErrors {
	/** Email error value */
	email: string

	/** Password error value */
	password: string
}

/** Default value for a form with authorization errors. */
const defaultFormErrors: ILoginFormErrors = {
	email: '',
	password: '',
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
		/** The state for the user's form. */
		const [form, setForm] = useState<ILoginForm>(defaultForm)

		/** The state for a form with user errors. */
		const [formErrors, setFormErrors] =
			useState<ILoginFormErrors>(defaultFormErrors)

		// Function to create a new error to show it to the user.
		const newError = useNotificationsStore(store => store.newError)

		/** Form validity state. */
		const [isValid, setIsValid] = useState<boolean>(false)

		/** State for email validity. */
		const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

		/** State for password validity. */
		const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

		/** State for token validity. */
		const [isTokenValid, setIsTokenValid] = useState<boolean>(false)

		// A function for showing Loader to the user when requesting an API.
		const loader = useLoader()

		/** State with authorization juice for VK. */
		const [VKUserCode] = useVKAuth()

		/** With this feature, you can redirect the user to another route. */
		const navigate = useNavigate()

		/** You can use this function to send user data for authorization. */
		const login = useAuthStore(store => store.login)

		/**
		 * With this feature, you can send your user details for authorization with
		 * Google.
		 */
		const loginWithGoogle = useAuthStore(store => store.loginWithGoogle)

		/**
		 * With this feature, you can send your user details for authorization with
		 * VK.
		 */
		const loginWithVK = useAuthStore(store => store.loginWithVK)

		/** A reference to `inputEmail` in the DOM. */
		const inputEmail = useRef<HTMLInputElement | null>(null)

		/** A reference to `inputPassword` in the DOM. */
		const inputPassword = useRef<HTMLInputElement | null>(null)

		/** Link to the HCaptcha component in the DOM. */
		const hCaptchaRef = useRef<HCaptcha | null>(null)

		/** Function to send a request to the API. */
		async function sendToApi() {
			// Check the validity of the form.
			if (!isValid) {
				// Stop further execution of the function.
				return
			}

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

		/**
		 * Handler function to focus on `inputPassword` when the "Enter" key is
		 * pressed in `inputEmail`.
		 *
		 * @param e Keyboard event
		 */
		function emailKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
			// If the key pressed is "Enter".
			if (e.code === 'Enter') {
				// Focus on inputPassword.
				inputPassword.current?.focus()
			}
		}

		/**
		 * Handler function for keystrokes when the focus is on inputPassword.
		 *
		 * @param e Keyboard event
		 */
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

		/** A handler function for submitting a form. */
		async function submitHandler(e: FormEvent<HTMLFormElement>) {
			// We prevent the default browser behavior so that the form is not submitted.
			e.preventDefault()

			// send a request to the API.
			await sendToApi()
		}

		/** Handler function to retrieve the user's email. */
		function emailHandler(e: ChangeEvent<HTMLInputElement>) {
			// We add the email specified by the user to the form object.
			setForm(prev => ({ ...prev, email: e.target.value }))
		}

		/** Handler function to retrieve the user's password. */
		function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
			// We add the password specified by the user to the form object.
			setForm(prev => ({ ...prev, password: e.target.value }))
		}

		/** A handler function to retrieve solved captcha data. */
		function hCaptchaVerifyHandler(token: string) {
			// Add the resulting token to the form object.
			setForm(prev => ({ ...prev, token }))
		}

		/** Handler function to delete a token when it expires. */
		function hCaptchaExpireHandler() {
			// Delete the old token in the form object.
			setForm(prev => ({ ...prev, token: '' }))
		}

		/**
		 * Handler function to send user data to the API on successful authorization
		 * via Google.
		 */
		async function googleLoginOnSuccess(code: string) {
			const isSuccess = await loader(loginWithGoogle, code)

			// If the result is unsuccessful.
			if (!isSuccess) {
				newError('Failed to login.')

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the storage page.
			navigate(ERoutes.storage)
		}

		/** Function to bring up a popup window for authorization via Google. */
		const googleLoginPopup = useGoogleLogin({
			flow: 'auth-code',
			onError: console.error,
			onSuccess: async ({ code }) => await googleLoginOnSuccess(code),
		})

		/**
		 * Function handler that will be called when you click on the authorization
		 * button through Google.
		 */
		async function googleAuthHandler() {
			// Call a pop-up window to authorization using Google.
			googleLoginPopup()
		}

		/**
		 * Function handler that will be called when you click on the authorization
		 * button through VK.
		 */
		function vkAuthHandler() {
			// We redirect the user to the page for authorization via VK.
			redirectToVkAuthPage({
				clientId: VK_CLIENT_ID,
				redirectUri: vkRedirectUri,
				display: 'page',
			})
		}

		// Every time the VKUserCode changes, the callback is called.
		useEffect(() => {
			// If the code for registration via VK does not exist.
			if (!VKUserCode) {
				// Stop further execution of the function.
				return
			}

			/** Function for sending data of a user who authorization via VK to API. */
			const fetchDataToApi = async () => {
				const isSuccess = await loader(loginWithVK, VKUserCode, vkRedirectUri)

				// If the result is unsuccessful.
				if (!isSuccess) {
					newError('Failed to login.')

					// Stop further execution of the function.
					return
				}

				// We redirect the user to the storage page.
				navigate(ERoutes.storage)
			}

			fetchDataToApi()
		}, [VKUserCode, loginWithVK, navigate])

		/** Function handler for email validation. */
		const emailValidHandler = () => {
			// The result of validating the user's email.
			const isValid = validateEmail(form.email)

			// If the result is valid.
			if (isValid) {
				// Clearing the email field in an object with form errors.
				setFormErrors(prev => ({ ...prev, email: '' }))
			} else {
				// Add an error message to the email field in the form errors object.
				setFormErrors(prev => ({ ...prev, email: 'Enter a valid email' }))
			}

			// Changing the validity state.
			setIsEmailValid(isValid)
		}

		// Call the emailValidHandler function every time email changes.
		useEffectSkipFirstRender(emailValidHandler, [form.email])

		/** Function handler for password validation. */
		const passwordValidHandler = () => {
			// The result of validating the user's password.
			const isValid = validatePassword(form.password)

			// If the result is valid.
			if (isValid) {
				// Clearing the password field in an object with form errors.
				setFormErrors(prev => ({ ...prev, password: '' }))
			} else {
				// Add an error message to the password field in the form errors object.
				setFormErrors(prev => ({
					...prev,
					password:
						'The password must be no less than 8 characters and no more than 32 characters, contain at least one special character, one uppercase letter and one lowercase letter. ',
				}))
			}

			// Changing the validity state.
			setIsPasswordValid(isValid)
		}

		// Call the passwordValidHandler function every time password changes.
		useEffectSkipFirstRender(passwordValidHandler, [form.password])

		/** Function handler for hCaptcha token validation. */
		const hCaptchaTokenValidHandler = () => {
			// The result of validating the token.
			const isValid = !!form.token

			// Changing the validity state.
			setIsTokenValid(isValid)
		}

		// Call the hCaptchaTokenValidHandler function every time hCaptcha token changes.
		useEffectSkipFirstRender(hCaptchaTokenValidHandler, [form.token])

		// When changing the form validation values, we change the overall form validation value.
		useEffect(() => {
			/** Form Validation. */
			const isValid = isEmailValid && isPasswordValid && isTokenValid

			// Change the isValid state.
			setIsValid(isValid)
		}, [isEmailValid, isPasswordValid, isTokenValid])

		// When rendering, we focus on input.
		useEffect(() => {
			inputEmail.current?.focus()
		}, [])

		/** Root block styles */
		const styles = clsx(['max-w-xs w-full px-2', className])

		return (
			<div ref={ref} className={styles} {...props}>
				<Title className="mb-5" align="center">
					Authorization
				</Title>

				<Form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
					<InputEmail
						ref={inputEmail}
						error={formErrors.email}
						value={form.email}
						onChange={emailHandler}
						onKeyDown={emailKeyDownHandler}
					/>

					<InputPassword
						ref={inputPassword}
						error={formErrors.password}
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

					<GoogleAuth variant="large" fill="all" onClick={googleAuthHandler} />
					<VKAuth variant="large" fill="all" onClick={vkAuthHandler} />

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
