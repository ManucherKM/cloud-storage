import { ERoutes } from '@/configuration/routes'
import { redirectToVkAuthPage, useVKAuth } from '@/hooks'
import { useAuthStore } from '@/storage'
import { isObjectValuesEmpty, validateEmail, validatePassword } from '@/utils'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useGoogleLogin } from '@react-oauth/google'
import {
	Button,
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
export const Login = () => {
	const [form, setForm] = useState<ILoginForm>(defaultForm)
	const [formErrors, setFormErrors] =
		useState<ILoginFormErrors>(defaultFormErrors)
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const login = useAuthStore(state => state.login)
	const loginWithGoogle = useAuthStore(state => state.loginWithGoogle)
	const [VKUserCode, _] = useVKAuth()
	const loginWithVK = useAuthStore(state => state.loginWithVK)
	const navigate = useNavigate()
	const hCaptchaRef = useRef<HCaptcha>(null)

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (disableSubmit) {
			return
		}

		setIsLoading(true)

		const isLogin = await login(form)

		if (!isLogin) {
			setForm(defaultForm)
			setFormErrors(prev => ({
				...prev,
				email: 'Incorrect login or password.',
			}))
			hCaptchaRef.current?.resetCaptcha()
			setIsLoading(false)
			return
		}

		navigate(ERoutes.storage)
		setForm(defaultForm)
		setIsLoading(false)
	}

	function emailHandler(e: ChangeEvent<HTMLInputElement>) {
		const email = e.target.value
		const isValid = validateEmail(email)

		if (isValid) {
			setFormErrors(prev => ({ ...prev, email: '' }))
		} else {
			setFormErrors(prev => ({ ...prev, email: 'Enter a valid email' }))
		}

		setForm(prev => ({ ...prev, email }))
	}

	function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
		const password = e.target.value
		const isValid = validatePassword(password)

		if (isValid) {
			setFormErrors(prev => ({ ...prev, password: '' }))
		} else {
			setFormErrors(prev => ({
				...prev,
				password:
					'The password must be no less than 8 characters and no more than 32 characters, contain at least one special character, one uppercase letter and one lowercase letter. ',
			}))
		}

		setForm(prev => ({ ...prev, password }))
	}

	function hCaptchaVerifyHandler(token: string) {
		setForm(prev => ({ ...prev, token }))
	}

	function hCaptchaExpireHandler() {
		setForm(prev => ({ ...prev, token: '' }))
	}

	async function googleLoginOnSuccess(code: string) {
		setIsLoading(true)
		const isSuccess = await loginWithGoogle(code)

		if (!isSuccess) {
			setFormErrors(prev => ({ ...prev, email: 'Failed to login.' }))
			setIsLoading(false)
			return
		}

		navigate(ERoutes.storage)
		setIsLoading(false)
	}

	const googleLoginPopup = useGoogleLogin({
		flow: 'auth-code',
		onError: console.error,
		onSuccess: async ({ code }) => await googleLoginOnSuccess(code),
	})

	async function googleAuthHandler() {
		googleLoginPopup()
	}

	function vkAuthHandler() {
		if (VKUserCode) {
			return
		}

		redirectToVkAuthPage({
			clientId: VK_CLIENT_ID,
			redirectUri: CLIENT_URL + '/login',
			display: 'page',
		})
	}

	useEffect(() => {
		if (!VKUserCode) {
			return
		}

		;(async () => {
			setIsLoading(true)
			const isSuccess = await loginWithVK(VKUserCode)

			if (!isSuccess) {
				setFormErrors(prev => ({ ...prev, email: 'Failed to login.' }))
				setIsLoading(false)
				return
			}

			navigate(ERoutes.storage)
			setIsLoading(false)
		})()
	}, [VKUserCode])

	useEffect(() => {
		const isValid =
			isObjectValuesEmpty(formErrors) && !isObjectValuesEmpty(form)

		setDisableSubmit(!isValid)
	}, [form])

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
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
