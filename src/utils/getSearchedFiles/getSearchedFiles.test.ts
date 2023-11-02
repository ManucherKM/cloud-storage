import { IFile } from '@/storage/useFileStore/types'
import { describe, expect, test } from 'vitest'
import { getSearchedFiles } from './getSearchedFiles'

describe('Testing the getSearchedFiles function.', () => {
	const files: IFile[] = [
		{
			id: '1',
			fileName: 'Test file 1.txt',
			originalName: 'Original name 1.exe',
			inTheTrash: true,
		},
		{
			id: '2',
			fileName: 'Test file 2.js',
			originalName: 'Original name 2.json',
			inTheTrash: false,
		},
		{
			id: '3',
			fileName: 'Test file 3.xlsx',
			originalName: 'Original name 3.word',
			inTheTrash: false,
		},
	]

	test('Correct elements.', () => {
		expect(getSearchedFiles('.exe', files).length).toBe(1)
	})

	test('Correct value.', () => {
		expect(getSearchedFiles('.json', files)[0].originalName).toBe(
			'Original name 2.json',
		)
	})

	test('Empty value.', () => {
		expect(getSearchedFiles('', files).length).toBe(3)
	})
})
