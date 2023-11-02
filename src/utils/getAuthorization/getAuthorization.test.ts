import { describe, expect, test } from 'vitest'
import { getAuthorization } from './getAuthorization'

describe('Testing the getAuthorization function.', () => {
	test('Correct value.', () => {
		expect(getAuthorization('TOKEN')).toBe('Bearer TOKEN')
	})

	test('Correct length.', () => {
		expect(getAuthorization('')).toBe('Bearer ')
	})

	test('Empty value.', () => {
		expect(getAuthorization('')).toBe('Bearer ')
	})
})
