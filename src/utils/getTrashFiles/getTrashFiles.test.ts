import { IFile } from '@/storage/useFileStore/types'
import { getTrashFiles } from './getTrashFiles'

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
		expect(getTrashFiles(files).length).toBe(1)
	})

	test('Correct value.', () => {
		expect(getTrashFiles(files)[0].fileName).toBe('Test file 1.txt')
	})

	test('Incorrect value.', () => {
		expect(getTrashFiles(files)[1]).toBe(undefined)
	})

	test('Empty value.', () => {
		expect(getTrashFiles([]).length).toBe(0)
	})
})
