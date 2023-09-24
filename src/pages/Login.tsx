import { ERoutes } from '@/configuration/routes'
import { redirectToVkAuthPage, useVKAuth } from '@/hooks'
import { useAuthStore } from '@/storage'
import { isObjectValuesEmpty, validateEmail, validatePassword } from '@/utils'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useGoogleLogin } from '@react-oauth/google'
import {
	Alert,
	Button,
	Form,
	GoogleAuth,
	Input,
	Loader,
	TextError,
	Title,
	VKAuth,
} from 'kuui-react'
import type { ChangeEvent, FC, FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const VK_CLIENT_ID = import.meta.env.VITE_VK_CLIENT_ID as string
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL as string

/** Interface for the authorization form. */
export interface ILoginForm {
	email: string
	password: string
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
	email: string
	password: string
}

/** Default value for a form with authorization errors. */
const defaultFormErrors: ILoginFormErrors = {
	email: '',
	password: '',
}

/** Component for user authorization. */
export const Login: FC = () => {
	/** The state for the user's form. */
	const [form, setForm] = useState<ILoginForm>(defaultForm)

	/** The state for a form with user errors. */
	const [formErrors, setFormErrors] =
		useState<ILoginFormErrors>(defaultFormErrors)

	const [serverError, setServerError] = useState<string>('')

	/** The state to lock the submit button. */
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

	/** The state for rendering the `Loader` component. */
	const [isLoading, setIsLoading] = useState<boolean>(false)

	/** State with authorization juice for VK. */
	const [VKUserCode, _] = useVKAuth()

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

	/** The URI that was used during registration. */
	const vkRedirectUri = CLIENT_URL + '/login'

	/** Link to the HCaptcha component in the DOM. */
	const hCaptchaRef = useRef<HCaptcha>(null)

	/** A handler function for submitting a form. */
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		// We prevent the default browser behavior so that the form is not submitted.
		e.preventDefault()

		// Check to see if the form submit button is disabled.
		if (disableSubmit) {
			// Stop further execution of the function.
			return
		}

		// Showing the user the Loader.
		setIsLoading(true)

		// We get the result of sending data to the API.
		const isLogin = await login(form)

		// If authorization failed.
		if (!isLogin) {
			// Clearing the form.
			setForm(defaultForm)

			setServerError('Incorrect login or password.')

			// Reset the captcha.
			hCaptchaRef.current?.resetCaptcha()

			// We remove the Loader.
			setIsLoading(false)

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the storage page.
		navigate(ERoutes.storage)

		// Clearing the form.
		setForm(defaultForm)

		// We remove the Loader.
		setIsLoading(false)
	}

	/** Handler function to retrieve the user's email. */
	function emailHandler(e: ChangeEvent<HTMLInputElement>) {
		// We receive the email entered by the user.
		const email = e.target.value

		// The result of validating the user's email.
		const isValid = validateEmail(email)

		// If the result is valid.
		if (isValid) {
			// Clearing the email field in an object with form errors.
			setFormErrors(prev => ({ ...prev, email: '' }))
		} else {
			// Add an error message to the email field in the form errors object.
			setFormErrors(prev => ({ ...prev, email: 'Enter a valid email' }))
		}

		// We add the email specified by the user to the form object.
		setForm(prev => ({ ...prev, email }))
	}

	/** Handler function to retrieve the user's password. */
	function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
		// We receive the password entered by the user.
		const password = e.target.value

		// The result of validating the user's password.
		const isValid = validatePassword(password)

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

		// We add the password specified by the user to the form object.
		setForm(prev => ({ ...prev, password }))
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
		// Showing the user the Loader.
		setIsLoading(true)

		// We get the result of sending data to the API.
		const isSuccess = await loginWithGoogle(code)

		// If the result is unsuccessful.
		if (!isSuccess) {
			setServerError('Failed to login.')

			// We remove the Loader.
			setIsLoading(false)

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the storage page.
		navigate(ERoutes.storage)

		// We remove the Loader.
		setIsLoading(false)
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

	useEffect(() => {
		// If the code for registration via VK does not exist.
		if (!VKUserCode) {
			// Stop further execution of the function.
			return
		}

		/** Function for sending data of a user who authorization via VK to API. */
		const fetchDataToApi = async () => {
			// Showing the user the Loader.
			setIsLoading(true)

			// We get the result of sending data to the API.
			const isSuccess = await loginWithVK(VKUserCode, vkRedirectUri)

			// If the result is unsuccessful.
			if (!isSuccess) {
				setServerError('Failed to login.')

				// We remove the Loader.
				setIsLoading(false)

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the storage page.
			navigate(ERoutes.storage)

			// We remove the Loader.
			setIsLoading(false)
		}

		fetchDataToApi()
	}, [VKUserCode])

	function serverErrorTimeHandler() {
		setServerError('')
	}

	useEffect(() => {
		// The result of validating the form for errors.
		const isValid =
			isObjectValuesEmpty(formErrors) && !isObjectValuesEmpty(form)

		// Change the disableSubmit state.
		setDisableSubmit(!isValid)
	}, [form])

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			{serverError.length !== 0 && (
				<Alert
					text={serverError}
					variant="error"
					time={8}
					onTimeUp={serverErrorTimeHandler}
				/>
			)}

			{isLoading && <Loader />}

			<Title className="mb-5">Authorization</Title>

			<Form
				onSubmit={submitHandler}
				className="flex flex-col gap-3 w-full max-w-xs px-2"
			>
				{formErrors.email && (
					<TextError dimension="small" className="text-justify">
						{formErrors.email}
					</TextError>
				)}
				<Input
					fill="all"
					type="text"
					placeholder="email"
					value={form.email}
					onChange={emailHandler}
				/>
				{formErrors.password && (
					<TextError dimension="small" className="text-justify">
						{formErrors.password}
					</TextError>
				)}
				<Input
					fill="all"
					type="password"
					placeholder="password"
					value={form.password}
					onChange={passwordHandler}
				/>

				<HCaptcha
					ref={hCaptchaRef}
					theme="dark"
					sitekey={HCAPTCHA_SITEKEY}
					onVerify={hCaptchaVerifyHandler}
					onExpire={hCaptchaExpireHandler}
				/>

				<Button disabled={disableSubmit} variant="active" type="submit">
					Submit
				</Button>

				<div className="w-full h-[1px] bg-[--kuui-black-500]" />

				<GoogleAuth variant="large" onClick={googleAuthHandler} />
				<VKAuth variant="large" onClick={vkAuthHandler} />
			</Form>
		</div>
	)
}
