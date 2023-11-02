import { IFile } from '@/storage/useFileStore/types'
import { describe, expect, test } from 'vitest'
import { getValidFiles } from './getValidFiles'

describe('Testing the getTrashFiles function.', () => {
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
		expect(getValidFiles(files).length).toBe(2)
	})

	test('Correct value.', () => {
		expect(getValidFiles(files)[0].fileName).toBe('Test file 2.js')
	})

	test('Incorrect value.', () => {
		expect(getValidFiles(files)[2]).toBe(undefined)
	})

	test('Empty value.', () => {
		expect(getValidFiles([]).length).toBe(0)
	})
})
