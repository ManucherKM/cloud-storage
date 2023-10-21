// Utils
import { getVKAuthUrl } from '@/utils'
import { useEffect, useState } from 'react'

/** Display field interface for authorization via VK. */
export enum EVKAuthDisplay {
	page = 'page',
	popup = 'popup',
}

/** The error return interface of the `useVKAuth` hook. */
export interface IUseVKAuthError {
	error: string | null
	errorDescription: string | null
}

/** Interface for the incoming parameters of the `redirectToVkAuthPage` function. */
export interface IRedirectVKAuthTarget {
	clientId: string
	redirectUri: string
	display: `${EVKAuthDisplay}`
}

/** Default value for an object with `useVKAuth` hook errors. */
const defaultErrors: IUseVKAuthError = {
	error: '',
	errorDescription: '',
}

/** Using this hook, you can get a code for authorization in the application via VK, after successful authorization in VK. */
export function useVKAuth() {
	/**
	 * State for the authorization code.
	 */
	const [code, setIsCode] = useState<string>('')

	/**
	 * State for errors.
	 */
	const [error, setError] = useState<IUseVKAuthError>(defaultErrors)

	/**
	 * Current URL parameters.
	 */
	const params = new URLSearchParams(window.location.search)

	/**
	 * A function that will be executed every time the user’s URL changes.
	 */
	const hrefHandler = () => {
		// Current authorization code.
		const currentCode = params.get('code')

		// Variable for checking the authorization code.
		const isCodeExist = !!currentCode

		// If the code exists.
		if (isCodeExist) {
			// Add this value to the state.
			setIsCode(currentCode)
			return
		}

		// Current error.
		const currentError = params.get('error')

		// Variable for checking the error.
		const isErrorExist = !!currentError

		// If the error exists.
		if (isErrorExist) {
			// Description of the error returned by the VK API.
			const errorDescription = params.get('error_description')

			setError({
				error: currentError,
				errorDescription,
			})
			return
		}
	}

	// Every time the user's URL changes.
	useEffect(hrefHandler, [window.location.href])

	// We return the cortee from the code and the error object.
	return [code, error] as [string, IUseVKAuthError]
}

/** With this feature, you can redirect the user to the VK authorization page. */
export function redirectToVkAuthPage(target: IRedirectVKAuthTarget) {
	// We get the URL for authorization in VK.
	const url = getVKAuthUrl(target)

	// Redirect the user to this page.
	window.location.href = url
}
