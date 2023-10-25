// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 * With this function you can get valid files (that were not added to the trash
 * bin).
 *
 * @param files Array of files.
 * @returns An array of files not in the Recycle Bin.
 */
export function getValidFiles(files: IFile[]) {
	// Returning a filtered array of files.
	return files.filter(file => !file.inTheTrash)
}
