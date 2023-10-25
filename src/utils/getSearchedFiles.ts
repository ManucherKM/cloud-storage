// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 * With this feature, you can retrieve files based on your search query.
 *
 * @param search The string on which the search will be based.
 * @param files Array of files.
 * @returns An array of files for the search query.
 */
export function getSearchedFiles(search: string, files: IFile[]) {
	// Return the filtered array.
	return files.filter(file => {
		// Equate the file name to lower case.
		const fileName = file.originalName.toLocaleLowerCase()

		// We equate the query to lower case.
		const query = search.toLocaleLowerCase()

		// We return the boolean value of the content in the name of the search query file.
		return fileName.includes(query)
	})
}
