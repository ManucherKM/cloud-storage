// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 * With this feature, you can retrieve files based on your search query.
 *
 * @param search The string on which the search will be based.
 * @param files Array of files.
 */
export function getSearchedFiles(search: string, files: IFile[]) {
	return files.filter(file => {
		// Equate the file name to lower case.
		const fileName = file.originalName.toLocaleLowerCase()

		// We equate the query to lower case.
		const query = search.toLocaleLowerCase()

		return fileName.includes(query)
	})
}
