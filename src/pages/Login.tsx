import { useEffect, useState, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
	Title,
	Form,
	Input,
	Button,
	TextError,
	Loader,
	GoogleAuth,
	VKAuth,
} from 'kuui-react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { validateEmail, isObjectValuesEmpty, validatePassword } from '@/utils'
import { useAuthStore } from '@/storage'
import { ERoutes } from '@/routes'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string

export interface IForm {
	email: string
	password: string
	token: string
}

const defaultForm: IForm = {
	email: '',
	password: '',
	token: '',
}

export interface IFormErrors {
	email: string
	password: string
}

const defaultFormErrors: IFormErrors = {
	email: '',
	password: '',
}

export const Login = () => {
	const [form, setForm] = useState<IForm>(defaultForm)
	const [formErrors, setFormErrors] = useState<IFormErrors>(defaultFormErrors)
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const login = useAuthStore(state => state.login)
	const loginWithGoogle = useAuthStore(state => state.loginWithGoogle)
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

		setIsLoading(false)
		navigate(ERoutes.storage)
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
		console.log('Vk auth')
	}

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
