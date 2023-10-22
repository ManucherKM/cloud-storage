// Types
import type { IFile } from '@/storage/useFileStore/types'

/**
 * With this function you can get valid files (that were not added to the trash
 * bin).
 *
 * @param files Array of files.
 */
export function getValidFiles(files: IFile[]) {
	return files.filter(file => !file.inTheTrash)
}
