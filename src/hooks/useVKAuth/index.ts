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

/** With this hook you can get code for authorization via VK. */
export function useVKAuth() {
	const [code, setIsCode] = useState<string>('')
	const [error, setError] = useState<IUseVKAuthError>(defaultErrors)

	const params = new URLSearchParams(window.location.search)

	useEffect(() => {
		const currentCode = params.get('code')
		const isCodeExist = !!currentCode

		if (isCodeExist) {
			setIsCode(currentCode)
			return
		}

		const currentError = params.get('error')
		const isErrorExist = !!currentError

		if (isErrorExist) {
			const error = params.get('error')
			const errorDescription = params.get('error_description')

			setError({
				error,
				errorDescription,
			})
			return
		}
	}, [window.location.href])

	return [code, error] as [string, IUseVKAuthError]
}

/** With this feature, you can redirect the user to the VK authorization page. */
export function redirectToVkAuthPage(target: IRedirectVKAuthTarget) {
	const url = getVKAuthUrl(target)
	window.location.href = url
}
