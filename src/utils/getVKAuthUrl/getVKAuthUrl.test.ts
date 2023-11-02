import { describe, expect, test } from 'vitest'
import { IGetVKAuthUrl, IVKAuthParams, getVKAuthUrl } from './getVKAuthUrl'

describe('Testing the getVKAuthUrl function.', () => {
	const target: IGetVKAuthUrl = {
		clientId: '123',
		display: 'popup',
		redirectUri: 'https://example.com',
	}

	test('Correct redirectURI.', () => {
		const params = {
			redirect_uri: target.redirectUri,
		} as IVKAuthParams

		const redirectURI = new URLSearchParams(params).toString()

		expect(getVKAuthUrl(target).includes(redirectURI)).toBe(true)
	})

	test('Correct clientId.', () => {
		const params = {
			client_id: target.clientId,
		} as IVKAuthParams

		const clientId = new URLSearchParams(params).toString()

		expect(getVKAuthUrl(target).includes(clientId)).toBe(true)
	})

	test('Correct display.', () => {
		const params = {
			display: target.display,
		} as IVKAuthParams

		const display = new URLSearchParams(params).toString()

		expect(getVKAuthUrl(target).includes(display)).toBe(true)
	})
})
