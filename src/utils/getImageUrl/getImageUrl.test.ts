import { getImageUrl } from './getImageUrl'

describe('Testing the getImageUrl function.', () => {
	test('Correct value.', () => {
		const fileName = 'Test file.txt'
		expect(getImageUrl(fileName).includes(fileName)).toBe(true)
	})

	test('Empty value.', () => {
		expect(getImageUrl('')).toBe([''])
	})
})
