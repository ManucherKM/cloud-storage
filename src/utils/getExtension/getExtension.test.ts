import { describe, expect, test } from 'vitest'
import { getExtension } from './getExtension'

describe('Testing the getExtension function.', () => {
	test('Correct value.', () => {
		expect(getExtension('Test file.txt')).toEqual(['Test file', 'txt'])
	})

	test('Incorrect value.', () => {
		expect(getExtension('TestFile')).toEqual(['TestFile'])
	})

	test('Empty value.', () => {
		expect(getExtension('')).toEqual([''])
	})
})
