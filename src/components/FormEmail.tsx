// Types
import type {
	ChangeEvent,
	FC,
	FormEvent,
	HTMLAttributes,
	KeyboardEvent,
} from 'react'

// Utils
import { ERoutes } from '@/configuration/routes'
import { useNotificationsStore, useRestoreAccount } from '@/storage'
import { validateEmail } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import {
	useEffectSkipFirstRender,
	useLoader,
	useSkipFirstRender,
} from '@/hooks'
import { Button, Form, Paragraph } from 'kuui-react'
import { InputEmail } from './InputEmail'

/** Valid types for `FormEmail`. */
export type TFormEmail = HTMLAttributes<HTMLDivElement>

/** `FormEmail` components interface. */
export interface IFormEmail extends TFormEmail {}

/**
 * Form to check user existence based on email.
 *
 * @example
 * 	;<FormEmail />
 */
export const FormEmail: FC<IFormEmail> = () => {
	/** Email saved in storage. */
	const storeEmail = useRestoreAccount(store => store.email)

	/** Function for changing email from storage. */
	const setStoreEmail = useRestoreAccount(store => store.setEmail)

	/** The state for email within a component. */
	const [email, setEmail] = useState<string>(storeEmail || '')

	/** State for email validity. */
	const [isValid, setIsValid] = useState<boolean>(!!storeEmail)

	/** Function to query the API to create a one-time password. */
	const createOtp = useRestoreAccount(store => store.createOtp)

	/** State for errors */
	const [error, setError] = useState<string>('')

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	/** Input for email used in the form. */
	const input = useRef<HTMLInputElement | null>(null)

	/** A state indicating whether this is the first render or not. */
	const isFirstRender = useSkipFirstRender()

	/** Function to redirect the user. */
	const navigate = useNavigate()

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	/** Function to send a request to the API. */
	async function sendToApi() {
		// If the email is not valid, terminate the function.
		if (!isValid) return

		// We remove the focus from the input so that the user doesn't type anything into the input while the request is being processed.
		input.current?.blur()

		const isSuccess = await loader(createOtp)

		// If the one-time password could not be created.
		if (!isSuccess) {
			// Showing the user the error.
			newError('The user could not be found.')

			// Terminate the function.
			return
		}

		// Redirect the user to a page with a one-time password.
		navigate(ERoutes.restoreAccountOTP)
	}

	/**
	 * Handler function to change the state of `email`.
	 *
	 * @param e Change event
	 */
	function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		// Change the state of "email".
		setEmail(e.target.value)
	}

	/**
	 * Handler function that will be processed when the form is sent through the
	 * button.
	 *
	 * @param e Form event
	 */
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the browser.
		e.preventDefault()

		// Send the request to the server.
		await sendToApi()
	}

	/**
	 * Calls the sendToAPI function when the `Enter` key is pressed inside the
	 * input.
	 *
	 * @param e Keyboard event
	 */
	async function keyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
		// If the "Enter" key is pressed.
		if (e.code === 'Enter') {
			// Send the request to the server.
			await sendToApi()
		}
	}

	/** Handler function that clears the `serverError` value. */
	function serverErrorTimeHandler() {
		// Clearing the "serverError" state.
		newError('')
	}

	// When rendering a component, we focus on input.
	useEffect(() => {
		input.current?.focus()
	}, [])

	// Every time the email changes, the callback is called.
	useEffectSkipFirstRender(() => {
		// Let's skip the first render.
		if (isFirstRender) return

		// Save the email value to the store.
		setStoreEmail(email)

		// Check email validity.
		const isValid = validateEmail(email)

		// If email is valid, clear the error state.
		if (isValid) {
			setError('')
		}
		// Otherwise, we add the error text to the "error" state.
		else {
			setError('Enter a valid email')
		}

		// Changing the validity state.
		setIsValid(isValid)
	}, [email])

	return (
		<>
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
					<Button disabled={!isValid} variant="active" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</>
	)
}
