import { validatePassword } from './validatePassword'

describe('Testing the validatePassword function.', () => {
	test('Correct value.', () => {
		expect(validatePassword('Test123!?')).toBe(true)
	})

	test('Incorrect value.', () => {
		expect(validatePassword('Test123Test')).toBe(false)
	})

	test('Empty value.', () => {
		expect(validatePassword('')).toBe(false)
	})
})
