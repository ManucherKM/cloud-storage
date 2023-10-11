import { useStore } from '@/storage'
import { validateEmail } from '@/utils'
import { Button, Form, Paragraph } from 'kuui-react'
import {
	ChangeEvent,
	FC,
	FormEvent,
	HTMLAttributes,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AlertError, InputEmail } from '.'

export type TFormEmail = HTMLAttributes<HTMLDivElement>

export interface IFormEmail extends TFormEmail {}

export const FormEmail: FC<IFormEmail> = () => {
	const [email, setEmail] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
	const [serverError, setServerError] = useState<string>('')
	const setLoading = useStore(store => store.setLoading)
	const input = useRef<HTMLInputElement>(null)

	async function sendToApi() {
		if (error) {
			return
		}

		input.current?.blur()

		setLoading(true)
		console.log(email)

		// API

		setLoading(false)
	}

	function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		const isValid = validateEmail(e.target.value)

		if (isValid) {
			setError('')
		} else {
			setError('Enter a valid email')
		}

		setEmail(e.target.value)
	}

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await sendToApi()
	}

	async function keyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') {
			await sendToApi()
		}
	}

	function serverErrorTimeHandler() {
		setServerError('')
	}

	useEffect(() => {
		input.current?.focus()
	}, [input.current])

	useEffect(() => {
		if (email && !error) {
			setDisableSubmit(false)
		} else {
			setDisableSubmit(true)
		}
	}, [email, error])

	return (
		<>
			<AlertError error={serverError} onTimeUp={serverErrorTimeHandler} />
			<div className="max-w-xs w-full px-2">
				<Form onSubmit={submitHandler} className="w-full flex flex-col gap-3">
					<Paragraph align="center">Enter your recovery email.</Paragraph>
					<InputEmail
						ref={input}
						error={error}
						value={email}
						onKeyDown={keyDownHandler}
						onChange={changeHandler}
					/>
					<Button disabled={disableSubmit} variant="active" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</>
	)
}
