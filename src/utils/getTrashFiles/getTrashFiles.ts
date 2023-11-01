// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 * Using this function, you can filter an array of files and get those that
 * should be in the trash.
 *
 * @param files Array of files
 * @returns An array of trash files.
 */
export function getTrashFiles(files: IFile[]) {
	// We return an array of filtered files.
	return files.filter(file => file.inTheTrash)
}
