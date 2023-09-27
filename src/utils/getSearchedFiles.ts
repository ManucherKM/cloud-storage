import { IFile } from '@/storage/useFileStore/types'

export function getSearchedFiles(search: string, files: IFile[]) {
	return files.filter(file => {
		const fileName = file.originalName.toLocaleLowerCase()
		const query = search.toLocaleLowerCase()

		return fileName.includes(query)
	})
}
