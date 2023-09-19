import { ERoutes } from '@/configuration/routes'
import { redirectToVkAuthPage, useVKAuth } from '@/hooks'
import { useAuthStore } from '@/storage'
import { isObjectValuesEmpty, validateEmail, validatePassword } from '@/utils'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useGoogleLogin } from '@react-oauth/google'
import {
	Button,
	ConfirmEmail,
	Form,
	GoogleAuth,
	Input,
	Loader,
	TextError,
	Title,
	VKAuth,
} from 'kuui-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const VK_CLIENT_ID = import.meta.env.VITE_VK_CLIENT_ID as string
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL as string

/** Interface for the enrollment form. */
export interface IRegistrationForm {
	email: string
	password: string
	token: string
}

/** The default value for the enrollment form. */
const defaultForm: IRegistrationForm = {
	email: '',
	password: '',
	token: '',
}

/** Form interface with registration errors. */
export interface IRegistrationFormErrors {
	email: string
	password: string
}

/** Default value for a form with registration errors. */
const defaultFormErrors: IRegistrationFormErrors = {
	email: '',
	password: '',
}

/** Component for user registration. */
export const Registration = () => {
	/** The state for the user's form. */
	const [form, setForm] = useState<IRegistrationForm>(defaultForm)

	/** The state for rendering the `ConfirmEmail` component. */
	const [confirmEmail, setConfirmEmail] = useState<boolean>(false)

	/** The state for a form with user errors. */
	const [formErrors, setFormErrors] =
		useState<IRegistrationFormErrors>(defaultFormErrors)

	/** The state to lock the submit button. */
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

	/** The state for rendering the `Loader` component. */
	const [isLoading, setIsLoading] = useState<boolean>(false)

	/** State with authorization juice for VK. */
	const [VKUserCode, _] = useVKAuth()

	/** With this feature, you can redirect the user to another route. */
	const navigate = useNavigate()

	/** You can use this function to send user data for registration. */
	const registration = useAuthStore(state => state.registration)

	/**
	 * With this feature, you can send your user details for registration with
	 * Google.
	 */
	const registrationWithGoogle = useAuthStore(
		state => state.registrationWithGoogle,
	)

	/** With this feature, you can send your user details for registration with VK. */
	const registrationWithVk = useAuthStore(state => state.registrationWithVk)

	/** URi to which the user will be redirected after authorization on the VK page. */
	const vkRedirectUri = CLIENT_URL + '/registration'

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
		const isRegistered = await registration(form)

		// If registration failed.
		if (!isRegistered) {
			// Clearing the form.
			setForm(defaultForm)

			// We show an error message in the form.
			setFormErrors(prev => ({ ...prev, email: 'Failed to register.' }))

			// Reset the captcha.
			hCaptchaRef.current?.resetCaptcha()

			// We remove the Loader.
			setIsLoading(false)

			// Stop further execution of the function.
			return
		}

		// We remove the Loader.
		setIsLoading(false)

		// Change the state of confirmEmail.
		setConfirmEmail(true)
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
	async function googleRegistrationOnSuccess(code: string) {
		// Showing the user the Loader.
		setIsLoading(true)

		// We get the result of sending data to the API.
		const isSuccess = await registrationWithGoogle(code)

		// If the result is unsuccessful.
		if (!isSuccess) {
			// We show an error message in the form.
			setFormErrors(prev => ({ ...prev, email: 'Failed to register.' }))

			// We remove the Loader.
			setIsLoading(false)

			// Stop further execution of the function.
			return
		}

		// We redirect the user to the authorization page.
		navigate(ERoutes.login)

		// We remove the Loader.
		setIsLoading(false)
	}

	/** Function to bring up a popup window for registration via Google. */
	const googleRegistrationPopup = useGoogleLogin({
		flow: 'auth-code',
		onError: console.error,
		onSuccess: async ({ code }) => await googleRegistrationOnSuccess(code),
	})

	/**
	 * Function handler that will be called when you click on the registration
	 * button through Google.
	 */
	function googleAuthHandler() {
		// Call a pop-up window to register using Google.
		googleRegistrationPopup()
	}

	/**
	 * Function handler that will be called when you click on the registration
	 * button through VK.
	 */
	async function vkAuthHandler() {
		// We redirect the user to the page for registration via VK.
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

		/** Function for sending data of a user who registers via VK to API. */
		const fetchDataToApi = async () => {
			// Showing the user the Loader.
			setIsLoading(true)

			// We get the result of sending data to the API.
			const isSuccess = await registrationWithVk(VKUserCode, vkRedirectUri)

			// If the result is unsuccessful.
			if (!isSuccess) {
				// We show an error message in the form.
				setFormErrors(prev => ({ ...prev, email: 'Failed to register.' }))

				// We remove the Loader.
				setIsLoading(false)

				// Stop further execution of the function.
				return
			}

			// We redirect the user to the authorization page.
			navigate(ERoutes.login)

			// We remove the Loader.
			setIsLoading(false)
		}

		fetchDataToApi()
	}, [VKUserCode])

	useEffect(() => {
		// The result of validating the form for errors.
		const isValid =
			isObjectValuesEmpty(formErrors) && !isObjectValuesEmpty(form)

		// Change the disableSubmit state.
		setDisableSubmit(!isValid)
	}, [form])

	// If the user needs to verify their account.
	if (confirmEmail) {
		return <ConfirmEmail email={form.email} />
	}

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			{isLoading && <Loader />}

			<Title className="mb-5">Registration</Title>

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
					value={form.password}
					placeholder="password"
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
