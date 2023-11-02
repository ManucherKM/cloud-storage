import { describe, expect, test } from 'vitest'
import { validateEmail } from './validateEmail'

describe('Testing the validateEmail function.', () => {
	test('Correct value.', () => {
		expect(validateEmail('test@gmail.com')).toBe(true)
	})

	test('Incorrect value.', () => {
		expect(validateEmail('test@gmail')).toBe(false)
	})

	test('Empty value.', () => {
		expect(validateEmail('')).toBe(false)
	})
})
