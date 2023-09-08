import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Title, Form, Input, Button, TextError } from 'kuui-react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { validateEmail, isObjectValuesEmpty, validatePassword } from '@/utils'

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string

export interface IForm {
	email: string
	password: string
	token: string
	ekey: string
}

const defaultForm: IForm = {
	email: '',
	password: '',
	token: '',
	ekey: '',
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

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (disableSubmit) {
			return
		}

		// API

		setForm(defaultForm)
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

	function hCaptchaHandler(token: string, ekey: string) {
		setForm(prev => ({ ...prev, token, ekey }))

		// After 2 minutes the data becomes out of date. We delete them.
		setTimeout(
			() => {
				setForm(prev => ({ ...prev, token: '', ekey: '' }))
			},
			1000 * 60 * 2,
		)
	}

	useEffect(() => {
		const isValid =
			isObjectValuesEmpty(formErrors) && !isObjectValuesEmpty(form)

		setDisableSubmit(!isValid)
	}, [form])

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
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
					onChange={passwordHandler}
				/>

				<HCaptcha sitekey={HCAPTCHA_SITEKEY} onVerify={hCaptchaHandler} />

				<Button disabled={disableSubmit} variant="active" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}
