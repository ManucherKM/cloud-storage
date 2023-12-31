// Utils
import { getVKAuthUrl } from '@/utils'
import { useEffect, useState } from 'react'

/** Display field interface for authorization via VK. */
export enum EVKAuthDisplay {
	/** Display option page. */
	page = 'page',

	/** Display option popup. */
	popup = 'popup',
}

/** The error return interface of the `useVKAuth` hook. */
export interface IUseVKAuthError {
	/** Error text. */
	error: string | null

	/** Error description */
	errorDescription: string | null
}

/** Interface for the incoming parameters of the `redirectToVkAuthPage` function. */
export interface IRedirectVKAuthTarget {
	/** VK client id for correct work with the VK API. */
	clientId: string

	/** VK redirect URI for correct work with the VK API. */
	redirectUri: string

	/** The type of display that will be shown to the user for authorization. */
	display: `${EVKAuthDisplay}`
}

/** Default value for an object with `useVKAuth` hook errors. */
const defaultErrors: IUseVKAuthError = {
	error: '',
	errorDescription: '',
}

/**
 * Using this hook, you can get a code for authorization in the application via
 * VK, after successful authorization in VK.
 */
export function useVKAuth() {
	// State for the authorization code.
	const [code, setIsCode] = useState<string>('')

	// State for errors.
	const [error, setError] = useState<IUseVKAuthError>(defaultErrors)

	// Call the callback when rendering.
	useEffect(() => {
		// Current URL parameters.
		const params = new URLSearchParams(window.location.search)

		// Current authorization code.
		const currentCode = params.get('code')

		// Variable for checking the authorization code.
		const isCodeExist = !!currentCode

		// If the code exists.
		if (isCodeExist) {
			// Add this value to the state.
			setIsCode(currentCode)

			// Stop further execution of the function.
			return
		}

		//  Current error.
		const currentError = params.get('error')

		// Variable for checking the error.
		const isErrorExist = !!currentError

		// If the error exists.
		if (isErrorExist) {
			// Description of the error returned by the VK API.
			const errorDescription = params.get('error_description')

			// Change the error state.
			setError({
				error: currentError,
				errorDescription,
			})

			// Preventing further execution of the function.
			return
		}
	}, [])

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
