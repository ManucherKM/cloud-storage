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
	ConfirmEmail,
} from 'kuui-react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { validateEmail, isObjectValuesEmpty, validatePassword } from '@/utils'
import { useAuthStore } from '@/storage'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router'
import { ERoutes } from '@/routes'
import { redirectToVkAuthPage, useVKAuth } from '@/hooks/useVKAuth'

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const VK_CLIENT_ID = import.meta.env.VITE_VK_CLIENT_ID as string
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL as string

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

export const Registration = () => {
	const [form, setForm] = useState<IForm>(defaultForm)
	const [confirmEmail, setConfirmEmail] = useState<boolean>(false)
	const [formErrors, setFormErrors] = useState<IFormErrors>(defaultFormErrors)
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [VKUserCode] = useVKAuth()
	const navigate = useNavigate()
	const registration = useAuthStore(state => state.registration)
	const registrationWithGoogle = useAuthStore(
		state => state.registrationWithGoogle,
	)
	const hCaptchaRef = useRef<HCaptcha>(null)

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (disableSubmit) {
			return
		}

		setIsLoading(true)

		const isRegistered = await registration(form)

		if (!isRegistered) {
			setForm(defaultForm)
			setFormErrors(prev => ({ ...prev, email: 'Failed to register.' }))
			hCaptchaRef.current?.resetCaptcha()
			setIsLoading(false)
			return
		}

		setIsLoading(false)

		setConfirmEmail(true)
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

	async function googleRegistrationOnSuccess(code: string) {
		setIsLoading(true)
		const isSuccess = await registrationWithGoogle(code)

		if (!isSuccess) {
			setFormErrors(prev => ({ ...prev, email: 'Failed to register.' }))
			setIsLoading(false)
			return
		}

		navigate(ERoutes.login)
		setIsLoading(false)
	}

	const googleRegistrationPopup = useGoogleLogin({
		flow: 'auth-code',
		onError: console.error,
		onSuccess: async ({ code }) => await googleRegistrationOnSuccess(code),
	})

	function googleAuthHandler() {
		googleRegistrationPopup()
	}

	async function vkAuthHandler() {
		if (VKUserCode) {
			return
		}

		redirectToVkAuthPage({
			clientId: VK_CLIENT_ID,
			redirectUri: CLIENT_URL + '/registration',
			display: 'page',
		})
	}

	useEffect(() => {
		console.log(VKUserCode)
	}, [VKUserCode])

	useEffect(() => {
		const isValid =
			isObjectValuesEmpty(formErrors) && !isObjectValuesEmpty(form)

		setDisableSubmit(!isValid)
	}, [form])

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
