import { useEffect, useState } from 'react'
import { getVKAuthUrl } from './utils/getVKAuthUrl'
import { IUseVKAuthError, IUseVKAuthTarget } from './types'

const defaultErrors: IUseVKAuthError = {
	error: '',
	errorDescription: '',
}

export function useVKAuth(target: IUseVKAuthTarget) {
	const [code, setIsCode] = useState<string>('')
	const [error, setError] = useState<IUseVKAuthError>(defaultErrors)

	if (code.length || error.error?.length) {
		return {
			code,
			error,
		}
	}

	const url = getVKAuthUrl(target)

	useEffect(() => {
		const isCodeExist = window.location.href.includes('?code=')

		if (isCodeExist) {
			const code = window.location.href.split('?code=')[1]
			setIsCode(code)
			return
		}

		const isErrorExist = window.location.href.includes('?error=')

		if (isErrorExist) {
			const params = new URLSearchParams(window.location.search)

			const error = params.get('error')
			const errorDescription = params.get('error_description')

			setError({
				error,
				errorDescription,
			})
			return
		}
	}, [window.location.href])

	window.location.href = url
}
